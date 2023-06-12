import { Nullable } from "../../types/common";
import { authenticator } from "ts-authenticator-client"
import { makeAutoObservable } from 'mobx'
import { IUser } from "@/entities";
import { notification } from "antd";

export interface AuthCredentials {
  login: string
  password: string
}

const {
  login: tsLogin,
  checkAuth: tsCheckAuth,
  registration: tsRegistration,
} = authenticator('17KhMVb7mqjzhTLt7laDgWTH')

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
    localStorage.removeItem('accessToken')
    this.setUser(null)
  }

  login({ login, password }: AuthCredentials): Promise<void> {
    return tsLogin({
      login,
      password,
    }).then((response) => {
      if (!response.user) {
        notification.error({
          message: (response as any).message || 'Internal Error',
        })
        return
      }
      this.setUser(response.user)
      localStorage.setItem('accessToken', response.accessToken)
    }).catch((error) => {
      notification.error({
        message: error.message || 'Internal Error',
      })
    })
  }


  registration({ login, password }: AuthCredentials): Promise<void> {
    return tsRegistration({
      login,
      password,
    }).then((response) => {
      this.setUser(response.user)
      localStorage.setItem('accessToken', response.accessToken)
    }).catch((error) => {
      notification.error({
        message: error.message || 'Internal Error',
      })
    })
  }

  checkAuth() {
    this.setLoading(true)
    tsCheckAuth().then((response) => {
      if (response.user) {
        this.setUser(response.user)
      }
    }).finally(() => this.setLoading(false))
  }
}