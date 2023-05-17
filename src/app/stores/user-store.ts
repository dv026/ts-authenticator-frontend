import { Nullable } from "../../types/common";
import {
  login as tsLogin,
  checkAuth as tsCheckAuth,
  registration as tsRegistration,
} from "ts-authenticator-client"
import { makeAutoObservable } from 'mobx'
import { IUser } from "@/entities";

export interface AuthCredentials {
  login: string
  password: string
}
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
      this.setUser(response.user)
      localStorage.setItem('accessToken', response.accessToken)
    })
  }


  registration({ login, password }: AuthCredentials): Promise<void> {
    return tsRegistration({
      login,
      password,
    }).then((response) => {
      this.setUser(response.user)
      localStorage.setItem('accessToken', response.accessToken)
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