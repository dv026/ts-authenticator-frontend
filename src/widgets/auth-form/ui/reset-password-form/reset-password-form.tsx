import { Button, Form, Input } from "antd"
import { FC, useState } from "react"
import { useParams } from "react-router-dom"

import { useStore } from "@/app/stores"
import { styles } from "./styles"
import { IResetCredentials } from "../../model"

interface ResetPasswordFormProps {
  setLoginStep: () => void
}

export const ResetPasswordForm: FC<ResetPasswordFormProps> = ({
  setLoginStep,
}) => {
  const { token } = useParams()
  const { authStore } = useStore()
  const [resetCredentials, setResetCredentials] = useState<IResetCredentials>({
    password: "",
    confirmPassword: "",
  })

  const handleResetPassword = () => {
    authStore
      .resetPassword({
        token: token || "",
        newPassword: resetCredentials.password,
      })
      .finally(() => setLoginStep())
  }

  const validator = async (rule: any, value: any, callback: any) => {
    if (value && value.length > 3) {
      return Promise.resolve()
    } else {
      return Promise.reject("Length should be more 3")
    }
  }

  const confirmValidator = async (rule: any, value: any, callback: any) => {
    if (resetCredentials.confirmPassword !== resetCredentials.password) {
      return Promise.reject("Not equal")
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
        name="password"
        validateTrigger={["onChange", "onBlur", "onFocus"]}
        rules={[{ validator, required: true }]}
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
        name="confirmPassword"
        validateTrigger={["onChange", "onBlur", "onFocus"]}
        rules={[{ required: true, validator: confirmValidator }]}
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
