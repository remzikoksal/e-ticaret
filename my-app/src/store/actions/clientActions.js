import {
  CLIENT_SET_USER,
  CLIENT_SET_ROLES,
  CLIENT_SET_THEME,
  CLIENT_SET_LANGUAGE,
} from '../reducers/clientReducer'

export const setUser = (user) => ({ type: CLIENT_SET_USER, payload: user })
export const setRoles = (roles) => ({ type: CLIENT_SET_ROLES, payload: roles })
export const setTheme = (theme) => ({ type: CLIENT_SET_THEME, payload: theme })
export const setLanguage = (language) => ({ type: CLIENT_SET_LANGUAGE, payload: language })
