import Axios from 'axios'

const axios = Axios.create({
  baseURL: '/api',
})

axios.interceptors.request.use((config) => {
  return config
})

axios.interceptors.response.use((res) => {
  return res.data
})

export default axios
