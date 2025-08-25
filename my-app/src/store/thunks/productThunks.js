
import { api } from '../../lib/axios'
import {
  setCategories,
  setFetchState,
  setProductList,
  setTotal,
} from '../actions/productActions'


export const fetchCategoriesIfNeeded = () => async (dispatch, getState) => {
  const has = getState()?.product?.categories?.length > 0
  if (has) return

  try {

    dispatch(setFetchState('FETCHING'))

    const res = await api.get('/categories')
    const list = Array.isArray(res.data?.categories)
      ? res.data.categories
      : Array.isArray(res.data)
      ? res.data
      : []

    dispatch(setCategories(list))
    dispatch(setFetchState('FETCHED'))
  } catch (err) {
    console.error('fetchCategoriesIfNeeded failed:', err)
    dispatch(setFetchState('FAILED'))
  }
}


export const fetchProducts = (params = {}) => async (dispatch) => {
  try {
    dispatch(setFetchState('FETCHING'))

    const res = await api.get('/products', { params })
    const data = res?.data || {}

    const list = Array.isArray(data.products) ? data.products : []
    const total = Number(data.total ?? list.length ?? 0)

    dispatch(setProductList(list))
    dispatch(setTotal(total))
    dispatch(setFetchState('FETCHED'))
  } catch (err) {
    console.error('fetchProducts failed:', err)
    dispatch(setProductList([]))
    dispatch(setTotal(0))
    dispatch(setFetchState('FAILED'))
  }
}
