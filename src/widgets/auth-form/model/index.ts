export interface ICredentials {
  login: string
  password: string
}

export interface IResetCredentials {
  password: string
  confirmPassword: string
}

export enum EAuthStep {
  Login = "login",
  Registration = "registration",
  ForgotPassword = "fortgot-password",
  ResetPassword = "reset-password",
}