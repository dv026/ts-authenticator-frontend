import { Button, Form, Input, notification } from "antd"
import { FC, useState } from "react"
import { resetPassword } from "ts-authenticator-client"
import { useNavigate, useParams } from "react-router-dom"

import { validateResetPasswords } from "../../lib/validate-password"
import { styles } from "./styles"
import { IResetCredentials } from "../../model"

interface ResetPasswordFormProps {
  setLoginStep: () => void
}

export const ResetPasswordForm: FC<ResetPasswordFormProps> = ({
  setLoginStep,
}) => {
  const { token } = useParams()
  const navigate = useNavigate()
  const [api, contextHolder] = notification.useNotification()
  const [resetCredentials, setResetCredentials] = useState<IResetCredentials>({
    password: "",
    confirmPassword: "",
  })

  const handleResetPassword = () => {
    const errors = validateResetPasswords(
      resetCredentials.password,
      resetCredentials.confirmPassword
    )
    if (errors.length === 0) {
      resetPassword({
        token: token || "",
        newPassword: resetCredentials.password,
      }).finally(() => setLoginStep())
    } else {
      errors.forEach((error) => {
        api.error({ message: error })
      })
    }
  }

  return (
    <Form
      autoComplete="off"
      onFinish={handleResetPassword}
      labelCol={{ span: 12 }}
    >
      <Form.Item
        label="Password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password
          onChange={(e) =>
            setResetCredentials((prev) => ({
              ...prev,
              password: e.target.value,
            }))
          }
          value={resetCredentials.password}
        />
      </Form.Item>
      <Form.Item
        label="Confirm Password"
        rules={[{ required: true, message: "Please confirm your password!" }]}
      >
        <Input.Password
          onChange={(e) =>
            setResetCredentials((prev) => ({
              ...prev,
              confirmPassword: e.target.value,
            }))
          }
          value={resetCredentials.confirmPassword}
        />
      </Form.Item>
      <Form.Item css={styles.submitButtonContainer}>
        <Button htmlType="submit" type="primary">
          Reset Password
        </Button>
      </Form.Item>
    </Form>
  )
}
