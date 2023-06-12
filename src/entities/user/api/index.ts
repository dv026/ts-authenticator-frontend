import { api } from '@/app/api/api-instace'

const userApiUrl = import.meta.env.VITE_API_URL
// const userApiUrl = 'http://localhost:3000/admin'

export const userApi = {
  getUsers: (queryFilterParams: IQueryFilterParams, querySorterParams: { field: string, direction: 'descend' | 'ascend'}) => {
    const filters = Object.entries(queryFilterParams)
      .filter(([_, value]) => Boolean(value))
      .reduce((acc, [key, value]) => acc += `${key}=${value}&`, '')

      let sorter = ''
      if (!querySorterParams.field) {
        sorter = `field=login&direction=descend`
      } else {
        sorter = `field=${querySorterParams.field}&direction=${querySorterParams.direction}`
      }

    return api.get(`${userApiUrl}/users?${filters}&${sorter}`)
  },

  getUser: (id: string) => {
    return api.get(`${userApiUrl}/user/${id}`)
  },

  deleteUser: (id: string) => {
    return api.delete(`${userApiUrl}/user/${id}`)
  },

  createUser: ({ login, password, roles, apiKey }: { login: string, password: string, roles: string[], apiKey: string}) => {
    return api.post(`${userApiUrl}/user`, { login, password, roles, apiKey })
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
  apiKey?: string
}