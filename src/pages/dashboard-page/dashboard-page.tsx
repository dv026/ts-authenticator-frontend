import { Space, notification } from "antd"
import { UserTable } from "../../widgets/user-table/user-table"
import { useEffect } from "react"
import axios from "axios"
import { ApiKeyChooser } from "@/widgets/api-key-chooser/ui/api-key-chooser"
import { styles } from "./styles"

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
    <div css={styles.dashboard}>
      <ApiKeyChooser />
      <UserTable />
    </div>
  )
}
