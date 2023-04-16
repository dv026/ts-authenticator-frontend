import { Space, notification } from "antd"
import { UserTable } from "../../widgets/user-table/user-table"

export const DashboardPage = () => {
  const [api, contextHolder] = notification.useNotification()

  return (
    <Space>
      {contextHolder}
      <button
        onClick={() => {
          api.info({
            message: `Notification`,
            description: "description",
            placement: "topRight",
          })
        }}
      >
        show notification
      </button>
      <UserTable />
    </Space>
  )
}
