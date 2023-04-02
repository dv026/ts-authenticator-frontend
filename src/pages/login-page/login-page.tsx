import { FC, useState } from "react"
import {
  login,
  registration,
  forgotPassword,
  resetPassword,
} from "ts-authenticator-client"
import { Nullable } from "../../types/common"
import { useParams } from "react-router-dom"

interface ICredentials {
  login: string
  password: string
}

interface IResetCredentials {
  confirmPassword: string
  newPassword: string
}

enum AuthStep {
  Login = "login",
  Registration = "registration",
  ForgotPassword = "fortgot-password",
  ResetPassword = "reset-password",
}

interface LoginPageProps {
  resetPasswordStep?: boolean
}

export const LoginPage: FC<LoginPageProps> = ({
  resetPasswordStep = false,
}) => {
  const { token } = useParams()
  const [credentials, setCredentials] = useState<ICredentials>({
    login: "",
    password: "",
  })
  const [resetCredentials, setResetCredentials] = useState<IResetCredentials>({
    confirmPassword: "",
    newPassword: "",
  })
  const [authStep, setAuthStep] = useState<AuthStep>(
    resetPasswordStep ? AuthStep.ResetPassword : AuthStep.Login
  )

  const handleAuth = () => {
    let authPromise: Nullable<Promise<any>> = null
    if (authStep === AuthStep.Login) {
      authPromise = login({
        login: credentials.login,
        password: credentials.password,
      })
    } else if (authStep === AuthStep.Registration) {
      authPromise = registration({
        login: credentials.login,
        password: credentials.password,
      })
    }

    authPromise?.then((response) => console.log(response))
  }

  const getMainButtonText = (): string => {
    if (authStep === AuthStep.Login) {
      return "Login"
    } else if (authStep === AuthStep.Registration) {
      return "Registration"
    }

    return ""
  }

  const handleSetAuthStepChange = () => {
    if (authStep === AuthStep.Login) {
      setAuthStep(AuthStep.Registration)
    } else if (authStep === AuthStep.Registration) {
      setAuthStep(AuthStep.Login)
    }
  }

  const handleResetPassword = () => {
    if (
      resetCredentials.newPassword &&
      token &&
      resetCredentials.newPassword === resetCredentials.confirmPassword
    ) {
      resetPassword({ token, newPassword: resetCredentials.newPassword })
    }
  }

  const goToForgotPasswordStep = () => {
    setAuthStep(AuthStep.ForgotPassword)
  }

  const handleForgotPassword = () => {
    forgotPassword(credentials.login).then(() =>
      alert("сообщение отправлено на почту")
    )
  }

  const mainButtonText = getMainButtonText()

  const renderAuthStep = () => {
    switch (authStep) {
      case AuthStep.Login:
      case AuthStep.Registration: {
        return (
          <div>
            <div>
              <input
                value={credentials.login}
                onChange={(e) =>
                  setCredentials((prev) => ({ ...prev, login: e.target.value }))
                }
              />
              <input
                value={credentials.password}
                onChange={(e) =>
                  setCredentials((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
              />
              <button onClick={handleSetAuthStepChange}>toggle</button>
              <button onClick={handleAuth}>{mainButtonText}</button>
            </div>
            <div>
              <button onClick={goToForgotPasswordStep}>Forgot password?</button>
            </div>
          </div>
        )
      }
      case AuthStep.ForgotPassword: {
        return (
          <div>
            <div>
              <label>enter your email</label>
            </div>
            <input
              value={credentials.login}
              onChange={(e) =>
                setCredentials((prev) => ({
                  ...prev,
                  login: e.target.value,
                }))
              }
            />
            <div>
              <button onClick={handleForgotPassword}>Reset</button>
            </div>
          </div>
        )
      }
      case AuthStep.ResetPassword: {
        return (
          <div>
            <input
              onChange={(e) =>
                setResetCredentials((prev) => ({
                  ...prev,
                  newPassword: e.target.value,
                }))
              }
              value={resetCredentials.newPassword}
            />
            <input
              onChange={(e) =>
                setResetCredentials((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
              value={resetCredentials.confirmPassword}
            />
            <button onClick={handleResetPassword}>Reset Password</button>
          </div>
        )
      }
      default: {
        return null
      }
    }
  }

  return <div>{renderAuthStep()}</div>
}
