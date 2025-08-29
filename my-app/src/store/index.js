import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux';

import { thunk as thunkMiddleware } from 'redux-thunk';
import { createLogger } from 'redux-logger';

import clientReducer from './reducers/clientReducer';
import productReducer from './reducers/productReducer';
import shoppingCartReducer from './reducers/shoppingCartReducer';

const rootReducer = combineReducers({
  client: clientReducer,
  product: productReducer,
  shoppingCart: shoppingCartReducer,
});

const CART_KEY = 'shopping_cart';

function loadCartPreloaded() {
  try {
    const raw = localStorage.getItem(CART_KEY) || localStorage.getItem('cart');
    if (!raw) return undefined;
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return undefined;
    return { shoppingCart: { cart: arr } };
  } catch {
    return undefined;
  }
}

function saveCart(state) {
  try {
    const cartArr = state?.shoppingCart?.cart ?? [];
    localStorage.setItem(CART_KEY, JSON.stringify(cartArr));
  } catch {}
}

const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const middlewares = [thunkMiddleware];
if (import.meta.env.MODE !== 'production') {
  middlewares.push(createLogger({ collapsed: true }));
}


export const store = createStore(
  rootReducer,
  loadCartPreloaded(),               
  composeEnhancers(applyMiddleware(...middlewares))
);


store.subscribe(() => {
  saveCart(store.getState());
});

export default store;
