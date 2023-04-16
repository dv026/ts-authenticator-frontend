import axios from "axios"

const userApiUrl = 'http://localhost:3000/admin'

export const apiKeyApi = {
  get: (id: string) => {
    return axios.get(`${userApiUrl}/api-key/${id}`)
  },

  delete: (id: string) => {
    return axios.delete(`${userApiUrl}/api-key/${id}`)
  },

  create: ({ name }: { name: string }) => {
    return axios.post(`${userApiUrl}/api-key`, {
      name,
    })
  },

  update: (id: string, name: string) => {
    return axios.put(`${userApiUrl}/api-key/${id}`, {
      name
    })
  },

  getAll: () => {
    return axios.get(`${userApiUrl}/api-keys`)
  },

  deleteMany: (ids: string[]) => {
    return axios.post(`${userApiUrl}/api-keys`, {
      ids
    })
  }
}