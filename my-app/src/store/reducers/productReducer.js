
export const PRODUCT_SET_CATEGORIES = 'PRODUCT/SET_CATEGORIES'
export const PRODUCT_SET_LIST = 'PRODUCT/SET_LIST'
export const PRODUCT_SET_TOTAL = 'PRODUCT/SET_TOTAL'
export const PRODUCT_SET_FETCH_STATE = 'PRODUCT/SET_FETCH_STATE'
export const PRODUCT_SET_LIMIT = 'PRODUCT/SET_LIMIT'
export const PRODUCT_SET_OFFSET = 'PRODUCT/SET_OFFSET'
export const PRODUCT_SET_FILTER = 'PRODUCT/SET_FILTER'

const initialState = {
  categories: [],         
  productList: [],        
  total: 0,             
  limit: 25,            
  offset: 0,            
  filter: '',             
  fetchState: 'NOT_FETCHED'
}

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case PRODUCT_SET_CATEGORIES:  return { ...state, categories: action.payload || [] }
    case PRODUCT_SET_LIST:        return { ...state, productList: action.payload || [] }
    case PRODUCT_SET_TOTAL:       return { ...state, total: Number(action.payload) || 0 }
    case PRODUCT_SET_FETCH_STATE: return { ...state, fetchState: action.payload }
    case PRODUCT_SET_LIMIT:       return { ...state, limit: Number(action.payload) || 25 }
    case PRODUCT_SET_OFFSET:      return { ...state, offset: Number(action.payload) || 0 }
    case PRODUCT_SET_FILTER:      return { ...state, filter: action.payload ?? '' }
    default: return state
  }
}
