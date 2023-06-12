import { AxiosResponse } from "axios"
import { ApiKeyModel } from "../model"
import { api } from "@/app/api/api-instace"

// const userApiUrl = 'http://localhost:3000/admin'
const userApiUrl = import.meta.env.VITE_API_URL

export const apiKeyApi = {
  get: (id: string) => {
    return api.get(`${userApiUrl}/api-key/${id}`)
  },

  delete: (id: string) => {
    return api.delete(`${userApiUrl}/api-key/${id}`)
  },

  create: ({ name, userId }: { name: string; userId: string }) => {
    return api.post(`${userApiUrl}/api-key`, {
      name,
      userId,
    })
  },

  update: (id: string, name: string) => {
    return api.put(`${userApiUrl}/api-key/${id}`, {
      name,
    })
  },

  getAll: (userId: string) => {
    return api.get<ApiKeyModel[]>(`${userApiUrl}/api-keys?userId=${userId}`)
  },

  deleteMany: (ids: string[]) => {
    return api.post(`${userApiUrl}/api-keys`, {
      ids,
    })
  },
}
