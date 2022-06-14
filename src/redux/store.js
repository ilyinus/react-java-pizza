import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import pizzas from './reducers/pizzas'
import categories from './reducers/categories'
import filters from './reducers/filters'
import cart from './reducers/cart'
import alerts from './reducers/alerts'

const rootReducer = combineReducers({
    pizzas,
    categories,
    filters,
    cart,
    alerts
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export default store