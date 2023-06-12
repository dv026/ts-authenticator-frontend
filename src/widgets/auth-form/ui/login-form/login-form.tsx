import { Button, Form, Input } from "antd"
import { FC } from "react"

import { useStore } from "@/app/index"

import { styles } from "./styles"

interface LoginFormProp {
  login: string
  password: string
  isLoginStep: boolean
  setRegistrationStep: () => void
  setLoginStep: () => void
  onForgotClick?: () => void
  setLogin: (login: string) => void
  setPassword: (password: string) => void
}

export const LoginForm: FC<LoginFormProp> = ({
  login,
  password,
  onForgotClick,
  setRegistrationStep,
  setLoginStep,
  isLoginStep,
  setLogin,
  setPassword,
}) => {
  const { authStore } = useStore()

  const isRegistrationStep = !isLoginStep

  const getMainButtonText = (): string => (isLoginStep ? "Sign In" : "Sign Up")

  const handleAuth = async () => {
    if (isLoginStep) {
      await authStore.login({
        login,
        password,
      })
    } else {
      await authStore.registration({
        login,
        password,
      })
    }
  }

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid!',
      number: '${label} is not a valid!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  return (
    <Form labelCol={{ span: 8 }} css onFinish={handleAuth} autoComplete="off" validateMessages={validateMessages}>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, type: 'email' }]}
      >
        <Input value={login} onChange={(e) => setLogin(e.target.value)} />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true }]}
      >
        <Input.Password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Item>
      <Form.Item css={styles.submitButtonContainer}>
        <Button htmlType="submit" type="primary">
          {getMainButtonText()}
        </Button>
      </Form.Item>
      <div css={styles.extraButtons}>
        {isLoginStep && (
          <>
            <Button type="link" onClick={setRegistrationStep}>
              Sign up now
            </Button>
            {onForgotClick && (
              <Button type="link" onClick={onForgotClick}>
                Forgot password?
              </Button>
            )}
          </>
        )}
        {isRegistrationStep && (
          <Button type="link" onClick={setLoginStep}>
            Sign in
          </Button>
        )}
      </div>
    </Form>
  )
}
