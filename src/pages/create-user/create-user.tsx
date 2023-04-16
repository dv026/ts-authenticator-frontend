import React, { useEffect, useState } from "react"
import { Button, Form, Input, Select, notification } from "antd"
import { useParams } from "react-router-dom"
import { userApi } from "@/entities"

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo)
}

export const CreateUserPage: React.FC = () => {
  const [api, contextHolder] = notification.useNotification()
  api.success({
    message: `Notification`,
    description: "description",
    placement: "topRight",
  })
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("admin")
  const params = useParams()
  const userId = params.id

  const getUser = async () => {
    if (userId) {
      const response = await userApi.getUser(userId)
      setLogin(response.data.login)
      setRole(response.data.roles)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  const onFinish = (values: any) => {
    if (userId) {
      userApi.updateUser({ id: userId, login: login, password, roles: [role] })
    } else {
      userApi.createUser({ login: login, password, roles: [role] })
    }
  }

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {contextHolder}
      <Form.Item
        label="Login"
        rules={[{ required: true, message: "Please input your login!" }]}
      >
        <Input value={login} onChange={(e) => setLogin(e.target.value)} />
      </Form.Item>

      <Form.Item
        label="Password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Item>

      <Form.Item label="Role">
        <Select
          style={{ width: 120 }}
          onChange={(value) => setRole(value)}
          value={role}
          options={[
            { value: "user", label: "User" },
            { value: "admin", label: "Admin" },
          ]}
        />
      </Form.Item>

      <Form.Item
        wrapperCol={{ offset: 8, span: 16 }}
        style={{ textAlign: "center" }}
      >
        <Button type="primary" htmlType="submit">
          {userId ? "Update" : "Create"}
        </Button>
      </Form.Item>
    </Form>
  )
}
