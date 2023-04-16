import { FC, useState } from "react"

import { EAuthStep, ICredentials } from "../model"
import { styles } from "./styles"
import { LoginForm } from "./login-form"
import { ForgotPasswordForm } from "./forgot-password-form/forgot-password-form"
import { ResetPasswordForm } from "./reset-password-form"
import { useParams } from "react-router-dom"

export const AuthForm: FC = () => {
  const [credentials, setCredentials] = useState<ICredentials>({
    login: "",
    password: "",
  })

  const { token } = useParams()

  const [authStep, setAuthStep] = useState<EAuthStep>(
    Boolean(token) ? EAuthStep.ResetPassword : EAuthStep.Login
  )

  const goToForgotPasswordStep = () => {
    setAuthStep(EAuthStep.ForgotPassword)
  }

  const setLogin = (login: string) =>
    setCredentials((prev) => ({
      ...prev,
      login,
    }))

  const setPassword = (password: string) =>
    setCredentials((prev) => ({
      ...prev,
      password,
    }))

  const setLoginStep = () => setAuthStep(EAuthStep.Login)
  const setRegistrationStep = () => setAuthStep(EAuthStep.Registration)

  const renderEAuthStep = () => {
    switch (authStep) {
      case EAuthStep.Login:
      case EAuthStep.Registration: {
        return (
          <LoginForm
            login={credentials.login}
            password={credentials.password}
            isLoginStep={authStep === EAuthStep.Login}
            setRegistrationStep={setRegistrationStep}
            setLoginStep={setLoginStep}
            onForgotClick={goToForgotPasswordStep}
            setLogin={setLogin}
            setPassword={setPassword}
          />
        )
      }
      case EAuthStep.ForgotPassword: {
        return (
          <ForgotPasswordForm
            login={credentials.login}
            setLoginStep={setLoginStep}
            setLogin={setLogin}
          />
        )
      }
      case EAuthStep.ResetPassword: {
        return <ResetPasswordForm />
      }
      default: {
        return null
      }
    }
  }

  return <div css={styles.authForm}>{renderEAuthStep()}</div>
}
