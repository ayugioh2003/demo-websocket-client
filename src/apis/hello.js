import axios from 'axios'

const baseURL = 'http://localhost:3005/api'
export const sayHello = () => {
  return axios.get(`${baseURL}/hello`)
}
