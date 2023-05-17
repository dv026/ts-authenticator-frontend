import { notification } from "antd";
import axios from "axios";

export const api = axios.create()

api.interceptors.response.use((response) => {
  notification.success({ message: 'success' })
  return response;
}, (error) => {
  notification.error({ message: error.message })
  return Promise.reject(error.message);
});