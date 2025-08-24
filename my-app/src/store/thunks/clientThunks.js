
import { setUser, setRoles } from '../actions/clientActions'
import { api, setAuthToken, clearAuthToken } from '../../lib/axios'


export const fetchRolesIfNeeded = () => async (dispatch, getState) => {
  const current = getState().client?.roles
  if (Array.isArray(current) && current.length > 0) return
  try {
    const res = await api.get('/roles')
    const list = Array.isArray(res.data?.roles) ? res.data.roles
              : Array.isArray(res.data) ? res.data
              : []
    dispatch(setRoles(list))
  } catch (e) {
    console.error('fetchRolesIfNeeded failed', e)
  }
}


export const loginUser = (email, password, remember = false) => async (dispatch) => {
  try {
    const res = await api.post('/login', { email, password })
    const data = res?.data || {}

    const token =
      data.token ||
      data.accessToken ||
      data.access_token ||
      (data.tokens && (data.tokens.access?.token || data.tokens?.token)) ||
      null

    const user = data.user || data
    dispatch(setUser(user))

    if (token) {
      setAuthToken(token)
      if (remember) {
        localStorage.setItem('token', token)
      }
    }

    return { user, token }
  } catch (err) {
    const msg = err?.response?.data?.message || err?.response?.data?.error || 'Login failed'
    throw new Error(msg)
  }
}


export const initAuthFromToken = () => async (dispatch) => {
  const saved = localStorage.getItem('token')
  if (!saved) {
    clearAuthToken()
    return
  }

  setAuthToken(saved)

  try {
    const res = await api.get('/verify')
    const data = res?.data || {}
    const user = data.user || data
    dispatch(setUser(user))

    const newToken =
      data.token || data.accessToken || data.access_token || saved

    localStorage.setItem('token', newToken)
    setAuthToken(newToken)
  } catch {
    localStorage.removeItem('token')
    clearAuthToken()
  }
}
