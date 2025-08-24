
import axios from 'axios'


export const api = axios.create({
  baseURL: 'https://workintech-fe-ecommerce.onrender.com',
})


export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = token
  } else {
    delete api.defaults.headers.common['Authorization']
  }
}

export const clearAuthToken = () => {
  delete api.defaults.headers.common['Authorization']
}

export default api
