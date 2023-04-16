import { FC } from "react"
import { Button, Form, Input, notification } from "antd"
import { LeftOutlined } from "@ant-design/icons"
import { forgotPassword } from "ts-authenticator-client"

import { styles } from "./styles"

export interface ForgotPasswordFormProps {
  login: string
  setLogin: (login: string) => void
  setLoginStep: () => void
}
export const ForgotPasswordForm: FC<ForgotPasswordFormProps> = ({
  login,
  setLoginStep,
  setLogin,
}) => {
  const [api, contextHolder] = notification.useNotification()

  const handleForgotPassword = () => {
    forgotPassword(login)
      .then(() => api.success({ message: "Message has been sent" }))
      .catch(() => {
        api.error({ message: "Email not found" })
      })
      .finally(() => {
        setLoginStep()
        setLogin("")
      })
  }

  return (
    <Form
      css={styles.forgotPasswordForm}
      onFinish={handleForgotPassword}
      autoComplete="off"
      labelCol={{ span: 8 }}
    >
      {contextHolder}
      <Form.Item
        label="Email"
        rules={[{ required: true, message: "Please input your login!" }]}
      >
        <Input value={login} onChange={(e) => setLogin(e.target.value)} />
      </Form.Item>
      <Form.Item css={styles.submitButton}>
        <Button htmlType="submit" type="primary">
          Reset
        </Button>
      </Form.Item>
      <Button css={styles.backButton} onClick={setLoginStep} type="link">
        <LeftOutlined /> Back
      </Button>
    </Form>
  )
}
