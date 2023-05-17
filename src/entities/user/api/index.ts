import { api } from '@/app/api/api-instace'

// const userApiUrl = 'https://ts-authenticator.onrender.com/admin'
const userApiUrl = 'http://localhost:3000/admin'

export const userApi = {
  getUsers: (queryFilterParams: IQueryFilterParams) => {
    const filters = Object.entries(queryFilterParams).filter(([_, value]) => Boolean(value)).reduce((acc, [key, value]) => acc += `${key}=${value}&`, '')
    console.log({ filters })
    return api.get(`${userApiUrl}/users?${filters}`)
  },

  getUser: (id: string) => {
    return api.get(`${userApiUrl}/user/${id}`)
  },

  deleteUser: (id: string) => {
    return api.delete(`${userApiUrl}/user/${id}`)
  },

  createUser: ({ login, password, roles }: { login: string, password: string, roles: string[]}) => {
    return api.post(`${userApiUrl}/user`, { login, password, roles })
  },

  updateUser: ({ id, login, password, roles }: { id: string, login: string, password: string, roles: string[]}) => {
    return api.put(`${userApiUrl}/user/${id}`, { login, password, roles })
  },

  deleteUsers: (ids: string[]) => {
    return api.post(`${userApiUrl}/users`, {
      ids
    })
  }
}



export interface IQueryFilterParams {
  currentPage?: number
  pageSize?: number
  login?: string
  roles?: string
}