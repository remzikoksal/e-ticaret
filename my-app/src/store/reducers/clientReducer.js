
export const CLIENT_SET_USER = 'CLIENT/SET_USER'
export const CLIENT_SET_ROLES = 'CLIENT/SET_ROLES'
export const CLIENT_SET_THEME = 'CLIENT/SET_THEME'
export const CLIENT_SET_LANGUAGE = 'CLIENT/SET_LANGUAGE'

const initialState = {
  user: null,       
  addressList: [],  
  creditCards: [],  
  roles: [],        
  theme: '',       
  language: '',     
}

export default function clientReducer(state = initialState, action) {
  switch (action.type) {
    case CLIENT_SET_USER: return { ...state, user: action.payload }
    case CLIENT_SET_ROLES: return { ...state, roles: action.payload || [] }
    case CLIENT_SET_THEME: return { ...state, theme: action.payload }
    case CLIENT_SET_LANGUAGE: return { ...state, language: action.payload }
    default: return state
  }
}
