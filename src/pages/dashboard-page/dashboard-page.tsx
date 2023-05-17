import { Space, notification } from "antd"
import { UserTable } from "../../widgets/user-table/user-table"
import { useEffect } from "react"
import axios from "axios"

export const DashboardPage = () => {
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((response) => console.log(response))
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((response) => console.log(response))
  }, [])
  return (
    <Space>
      show notification
      <UserTable />
    </Space>
  )
}
