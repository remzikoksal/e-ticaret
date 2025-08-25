import {
  PRODUCT_SET_CATEGORIES,
  PRODUCT_SET_LIST,
  PRODUCT_SET_TOTAL,
  PRODUCT_SET_FETCH_STATE,
  PRODUCT_SET_LIMIT,
  PRODUCT_SET_OFFSET,
  PRODUCT_SET_FILTER,
} from '../reducers/productReducer'

export const setCategories = (arr) => ({ type: PRODUCT_SET_CATEGORIES, payload: arr })
export const setProductList = (arr) => ({ type: PRODUCT_SET_LIST, payload: arr })
export const setTotal = (num) => ({ type: PRODUCT_SET_TOTAL, payload: num })
export const setFetchState = (st) => ({ type: PRODUCT_SET_FETCH_STATE, payload: st })
export const setLimit = (n) => ({ type: PRODUCT_SET_LIMIT, payload: n })
export const setOffset = (n) => ({ type: PRODUCT_SET_OFFSET, payload: n })
export const setFilter = (str) => ({ type: PRODUCT_SET_FILTER, payload: str })
