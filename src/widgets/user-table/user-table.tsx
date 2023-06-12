import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import type { TableProps as AntdTableProps, TableProps } from "antd"
import type { TableRowSelection } from "antd/es/table/interface"
import { Button, Space, Table as AntdTable } from "antd"
import type {
  ColumnsType,
  FilterValue,
  SorterResult,
} from "antd/es/table/interface"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"

import { IUser, userApi } from "@/entities"

import "./user-table.css"
import { useStore } from "@/app/stores"
import { Hover } from "@/shared/hover/hover"
import { observer } from "mobx-react-lite"
import { routes } from "@/routes"

const convertToDataType = (users: any) => {
  if (!users) {
    return []
  }
  return users.map((user: any) => ({
    ...user,
    key: user._id,
  }))
}

export const UserTable: React.FC = observer(() => {
  const [sorter, setSorter] = useState<
    SorterResult<IUser> | SorterResult<IUser>[]
  >({})
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalCount, setTotalCount] = useState(0)
  const [filter, setFilter] = useState<Record<string, FilterValue | null>>({})
  const [users, setUsers] = useState<readonly IUser[]>([])

  const { apiKeyStore, authStore } = useStore()

  const navigate = useNavigate()

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys as string[])
  }

  useEffect(() => {
    refreshTable()
  }, [currentPage, pageSize, filter, apiKeyStore.currentApiKey])

  const rowSelection: TableRowSelection<IUser> = {
    selectedRowKeys,
    onChange: onSelectChange,
    columnWidth: 60,
  }

  const handleChange: AntdTableProps<IUser>["onChange"] = (
    pagination,
    filter,
    sort,
    t
  ) => {
    console.log("Various parameters")
    if (!(sort as any).direction) {
      ;(sort as any).direction = "ascend"
    }
    setSorter(sort)
    // setFilteredInfo(filters)
    // setSortedInfo(sorter as SorterResult<IUser>)
    setFilter(filter)
  }

  const clearFilters = () => {
    // setFilteredInfo({})
  }

  const clearAll = () => {
    // setFilteredInfo({})
    setSorter({})
  }

  const setAgeSort = () => {
    setSorter({
      order: "descend",
      columnKey: "login",
    })
  }

  const columns: ColumnsType<IUser> = [
    {
      title: "Login",
      dataIndex: "login",
      key: "login",
      filters: [
        { text: "dimavas026@yandex.ru", value: "dimavas026@yandex.ru" },
      ],
      // filteredValue: filteredInfo.name || null,
      // onFilter: (a, b) => a.length - b.length,
      // onFilter: (value, record) => {
      //   console.log({ value, record })
      //   console.log(1)
      //   return true
      // },
      sorter: (a, b) => a.login.length - b.login.length,
      // sortOrder: sortedInfo.columnKey === "login" ? sortedInfo.order : null,
      sortOrder:
        (sorter as any).columnKey === "login" ? (sorter as any).order : null,
      ellipsis: true,
    },
    {
      title: "Roles",
      dataIndex: "roles",
      key: "roles",
      filters: [
        { text: "Admin", value: "admin" },
        { text: "User", value: "user" },
      ],
      // onFilter: (value, record) => {
      //   console.log({ value, record })
      //   console.log(1)
      //   return true
      // },
      filterSearch: true,
      // filteredValue: filteredInfo.roles || null,
      ellipsis: true,
      // onChange: () => null
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      ellipsis: true,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, user) => (
        <Space>
          <Space>
            <DeleteOutlined onClick={() => handleDeleteUser(user._id)} />
          </Space>
          <Space>
            <EditOutlined onClick={() => navigate(`/user/edit/${user._id}`)} />
          </Space>
        </Space>
      ),
    },
  ]

  const refreshTable = () => {
    const currentApiKey = apiKeyStore.currentApiKey?.value
    if (!currentApiKey) return

    userApi
      .getUsers(
        {
          currentPage,
          pageSize,
          login: filter.login ? JSON.stringify(filter.login) : "",
          roles: filter.roles ? JSON.stringify(filter.roles) : "",
          apiKey: currentApiKey,
        },
        {
          field: (sorter as any).field,
          direction: (sorter as any).order,
        }
      )
      .then((response) => {
        setUsers(convertToDataType(response.users))
        setTotalCount(response.totalCount)
      })
  }

  const handleDeleteUser = async (id: string) => {
    await userApi.deleteUser(id)
    refreshTable()
  }

  const handleDeleteSelectedUsers = async (ids: string[]) => {
    await userApi.deleteUsers(ids)
    refreshTable()
  }

  return (
    <div style={{ position: "relative" }}>
      {!apiKeyStore.currentApiKeyId ? (
        <div>Choose Api Key to see its users</div>
      ) : (
        <>
          <Space
            style={{ marginBottom: 16, display: "flex" }}
            className="header-space"
          >
            <Button
              danger
              onClick={() => handleDeleteSelectedUsers(selectedRowKeys)}
            >
              Delete Selected
            </Button>
            <Button onClick={clearFilters}>Clear filters</Button>
            <Button onClick={clearAll}>Clear filters and sorters</Button>
            <Button
              style={{ marginLeft: "auto" }}
              type="primary"
              onClick={() => navigate(routes.user.create)}
            >
              Create user
            </Button>
          </Space>
          <AntdTable
            rowSelection={rowSelection}
            columns={columns}
            dataSource={users}
            // onRow={(val) => console.log("row", val)}
            pagination={{
              pageSize,
              pageSizeOptions: [10, 20, 1],
              onShowSizeChange: (_, pageSize) => setPageSize(pageSize),
              showSizeChanger: true,
              current: currentPage,
              total: totalCount,
              onChange: (currentPage) => setCurrentPage(currentPage),
            }}
            onChange={handleChange}
          />
        </>
      )}
    </div>
  )
})
