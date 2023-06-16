import { authenticator } from "ts-authenticator-client"
import { makeAutoObservable } from "mobx"
import { notification } from "antd"

import { IUser } from "@/entities"
import { Nullable } from "../../types/common"

export interface AuthCredentials {
  login: string
  password: string
}

export interface ResetPasswordCredentials {
  token: string
  newPassword: string
}

const {
  login: tsLogin,
  checkAuth: tsCheckAuth,
  registration: tsRegistration,
  forgotPassword: tsForgotPassword,
  resetPassword: tsResetPassword,
} = authenticator("17KhMVb7mqjzhTLt7laDgWTH")

export class AuthStore {
  user: Nullable<IUser> = null
  loading: boolean = true

  constructor() {
    makeAutoObservable(this)
  }

  setLoading(loading: boolean) {
    this.loading = loading
  }

  setUser(user: Nullable<IUser>) {
    this.user = user
  }

  logout() {
    localStorage.removeItem("accessToken")
    this.setUser(null)
  }

  login({ login, password }: AuthCredentials): Promise<void> {
    return tsLogin({
      login,
      password,
    })
      .then((response: any) => {
        if (response.status !== 200) {
          notification.error({
            message: response.message || "Internal Error",
          })
          return Promise.reject()
        }

        this.setUser(response.user)
        localStorage.setItem("accessToken", response.accessToken)
      })
      .catch((error) => {
        notification.error({
          message: error.message || "Internal Error",
        })
      })
  }

  registration({ login, password }: AuthCredentials): Promise<void> {
    return tsRegistration({
      login,
      password,
    })
      .then((response: any) => {
        if (response.status !== 200) {
          notification.error({
            message: response.message || "Internal Error",
          })
          return Promise.reject()
        }

        this.setUser(response.user)
        localStorage.setItem("accessToken", response.accessToken)
      })
      .catch((error: any) => {
        notification.error({
          message: error.message || "Internal Error",
        })
      })
  }

  checkAuth() {
    this.setLoading(true)
    tsCheckAuth()
      .then((response) => {
        if (response.user) {
          this.setUser(response.user)
        }
      })
      .finally(() => this.setLoading(false))
  }

  forgowPassword({ login }: Pick<AuthCredentials, "login">) {
    return tsForgotPassword(login).then((response: any) => {
      if (response.status !== 200) {
        notification.error({
          message: response.message || "Internal Error",
        })
        return Promise.reject()
      }

      this.setUser(response.user)
      localStorage.setItem("accessToken", response.accessToken)
      notification.success({
        message: response.message,
      })
    })
  }

  resetPassword({ newPassword, token }: ResetPasswordCredentials) {
    return tsResetPassword({ token, newPassword })
  }
}
