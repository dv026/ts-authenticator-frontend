import React, { useEffect, useState } from "react"
import type { TableProps as AntdTableProps } from "antd"
import type { TableRowSelection } from "antd/es/table/interface"
import { Button, Space, Table as AntdTable } from "antd"
import type {
  ColumnsType,
  FilterValue,
  SorterResult,
} from "antd/es/table/interface"
import { DeleteOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"

import { IApiKey, apiKeyApi } from "@/entities"

import { useStore } from "../../../app/stores/root-store"
import { InputModal } from "../../../shared/modal/modal"
import "./api-keys-table.css"

const convertToDataType = (apiKeys: any) => {
  return apiKeys.map((apiKey: any) => ({
    ...apiKey,
    key: apiKey._id,
  }))
}

export const ApiKeysTable: React.FC = () => {
  const { modalStore } = useStore()

  const { openModal } = modalStore
  const [sortedInfo, setSortedInfo] = useState<SorterResult<IApiKey>>({})

  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalCount, setTotalCount] = useState(0)
  const [filter, setFilter] = useState<Record<string, FilterValue | null>>({})
  const [apiKeys, setApiKeys] = useState<readonly IApiKey[]>([])

  const navigate = useNavigate()

  const onSelectChange = (newSelectedRowKeys: any) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys as string[])
  }

  useEffect(() => {
    refreshTable()
  }, [currentPage, pageSize, filter])

  const rowSelection: TableRowSelection<IApiKey> = {
    selectedRowKeys,
    onChange: (val1, val2) => {
      onSelectChange([])
    },
    columnWidth: 60,
  }

  const handleChange: AntdTableProps<IApiKey>["onChange"] = (
    pagination,
    filter,
    sort,
    t
  ) => {
    // console.log("Various parameters")
    // console.log({ pagination })
    // console.log({ filters })
    // console.log({ sorter })
    // setFilteredInfo(filters)
    // setSortedInfo(sorter as SorterResult<IUser>)
    setFilter(filter)
  }

  const clearFilters = () => {
    // setFilteredInfo({})
  }

  const clearAll = () => {
    // setFilteredInfo({})
    setSortedInfo({})
  }

  const setAgeSort = () => {
    setSortedInfo({
      order: "descend",
      columnKey: "login",
    })
  }

  const columns: ColumnsType<IApiKey> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      filters: [{ text: "Amazon", value: "amazon" }],
      // sorter: (a, b) => a.login.length - b.login.length,
      // sortOrder: sortedInfo.columnKey === "login" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, apiKey) => (
        <Space>
          <Space>
            <DeleteOutlined onClick={() => handleDeleteApiKey(apiKey._id)} />
          </Space>
          {/* <Space>
            <EditOutlined onClick={() => navigate(`/user/edit/${user._id}`)} />
          </Space> */}
        </Space>
      ),
    },
  ]

  const refreshTable = () => {
    apiKeyApi.getAll().then((response) => {
      // console.log(response)
      setApiKeys(convertToDataType(response.data))
    })
  }

  const handleDeleteApiKey = async (id: string) => {
    await apiKeyApi.delete(id)
    refreshTable()
  }

  const handleEditApiKey = (id: string) => {
    // modalStore.openModal()
  }

  const handleDeleteSelectedApiKeys = async (ids: string[]) => {
    await apiKeyApi.deleteMany(ids)
    refreshTable()
  }

  const createApiKey = async (value: string) => {
    await apiKeyApi.create({ name: value })
    refreshTable()
  }

  return (
    <>
      <InputModal title="Enter name" onSubmit={createApiKey} />
      <Space
        style={{ marginBottom: 16, display: "flex" }}
        className="header-space"
      >
        <Button
          danger
          onClick={() => handleDeleteSelectedApiKeys(selectedRowKeys)}
        >
          Delete Selected
        </Button>
        <Button
          style={{ marginLeft: "auto" }}
          type="primary"
          onClick={() => modalStore.openModal()}
        >
          Create API key
        </Button>
      </Space>
      <AntdTable
        // onChnage={() =>  null}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={apiKeys}
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
  )
}
