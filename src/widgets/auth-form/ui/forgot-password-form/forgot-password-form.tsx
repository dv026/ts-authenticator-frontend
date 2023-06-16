import { FC, useEffect } from "react"
import { Button, Form, Input, notification } from "antd"
import { LeftOutlined } from "@ant-design/icons"

import { styles } from "./styles"
import { useStore } from "@/app/stores"

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
  const { authStore } = useStore()
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      email: login,
    })
  }, [])

  const handleForgotPassword = () => {
    return authStore.forgowPassword({ login }).then(() => setLoginStep())
  }

  return (
    <Form
      form={form}
      css={styles.forgotPasswordForm}
      onFinish={handleForgotPassword}
      autoComplete="off"
      labelCol={{ span: 8 }}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            type: "email",
            message: "Please input your login!",
          },
        ]}
      >
        <Input onChange={(e) => setLogin(e.target.value)} />
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
