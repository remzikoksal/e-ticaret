import { api } from '../../lib/axios'
import {
  setCategories,
  setFetchState,
  setProductList,
  setTotal,
  setSelectedProduct,
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

    // 1) Server-side dene
    const res = await api.get('/products', { params })
    let data = res?.data || {}

    let list =
      Array.isArray(data?.products) ? data.products :
      Array.isArray(data) ? data : []

    let total = Number(
      data?.total ??
      (Array.isArray(data?.products) ? data.products.length : list.length) ??
      0
    )

    const wantLimit  = Number(params?.limit ?? 0)
    const wantOffset = Number(params?.offset ?? 0)
    const serverLikelyNoPagination =
      wantLimit > 0 &&
      (
        list.length === 0 ||
        (total && list.length === total) ||
        (wantLimit && list.length > wantLimit * 1.5)
      )

    if (serverLikelyNoPagination) {
      const resAll = await api.get('/products')
      const dataAll = resAll?.data || {}
      const all =
        Array.isArray(dataAll?.products) ? dataAll.products :
        Array.isArray(dataAll) ? dataAll : []
      const allTotal = Number(dataAll?.total ?? all.length ?? 0)

      const start = wantOffset || 0
      const end   = wantLimit ? start + wantLimit : undefined

      list  = all.slice(start, end)
      total = allTotal
    }

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

export const fetchProductById = (productId) => async (dispatch) => {
  try {
    dispatch(setFetchState('FETCHING'))
    const res = await api.get(`/products/${productId}`)
    const data = Array.isArray(res?.data) ? res.data[0] : res?.data || null
    dispatch(setSelectedProduct(data || null))
    dispatch(setFetchState('FETCHED'))
  } catch (err) {
    console.error('fetchProductById failed:', err)
    dispatch(setSelectedProduct(null))
    dispatch(setFetchState('FAILED'))
  }
}


export default {
  fetchCategoriesIfNeeded,
  fetchProducts,
  fetchProductById,
}
