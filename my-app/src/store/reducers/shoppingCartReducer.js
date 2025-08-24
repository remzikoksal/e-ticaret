
export const CART_SET_CART = 'CART/SET_CART'
export const CART_SET_PAYMENT = 'CART/SET_PAYMENT'
export const CART_SET_ADDRESS = 'CART/SET_ADDRESS'

const initialState = {
  cart: [],
  payment: {},
  address: {},
}

export default function shoppingCartReducer(state = initialState, action) {
  switch (action.type) {
    case CART_SET_CART:    return { ...state, cart: action.payload || [] }
    case CART_SET_PAYMENT: return { ...state, payment: action.payload || {} }
    case CART_SET_ADDRESS: return { ...state, address: action.payload || {} }
    default: return state
  }
}
