
import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux'

import { thunk as thunkMiddleware } from 'redux-thunk'
import { createLogger } from 'redux-logger'

import clientReducer from './reducers/clientReducer'
import productReducer from './reducers/productReducer'
import shoppingCartReducer from './reducers/shoppingCartReducer'

const rootReducer = combineReducers({
  client: clientReducer,
  product: productReducer,
  shoppingCart: shoppingCartReducer,
})


const composeEnhancers =
  (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const middlewares = [thunkMiddleware]
if (import.meta.env.MODE !== 'production') {
  middlewares.push(createLogger({ collapsed: true }))
}

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
)

export default store

