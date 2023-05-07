import axios from 'axios'

const baseURL = 'http://localhost:3005/api'
export const getMessages = (query) => {
  return axios.get(`${baseURL}/messages`, query)
}
