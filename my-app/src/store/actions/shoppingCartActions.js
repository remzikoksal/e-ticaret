
import {
  CART_SET_CART,
  CART_SET_PAYMENT,
  CART_SET_ADDRESS
} from '../reducers/shoppingCartReducer'

export const setCart = (arr) => ({ type: CART_SET_CART, payload: arr })
export const setPayment = (obj) => ({ type: CART_SET_PAYMENT, payload: obj })
export const setAddress = (obj) => ({ type: CART_SET_ADDRESS, payload: obj })
