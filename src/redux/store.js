import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import pizzas from './reducers/pizzas'
import filters from './reducers/filters'
import cart from './reducers/cart'

const rootReducer = combineReducers({
    pizzas,
    filters,
    cart
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

window.store = store

export default store