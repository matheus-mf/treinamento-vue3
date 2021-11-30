import axios from 'axios'

const httpClient = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL
})

httpClient.interceptors.response.use((response) => {
  return response
}, (error) => {
  const canThrowAnError = error.request.status === 0 || error.request.status === 500

  if (canThrowAnError) {
    throw new Error(error.message)
  }

  return error
})

export {
  httpClient
}
