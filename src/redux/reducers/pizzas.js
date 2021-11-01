import { FETCH_PIZZAS, SET_LOADING } from '../actions/actionTypes'

const initinalState = {
    items: [],
    isLoaded: false
}

const pizzas = (state = initinalState, action) => {
    switch (action.type) {
        case FETCH_PIZZAS:
            return {
                ...state,
                items: action.payload,
                isLoaded: true
            }
        case SET_LOADING:
            return {
                ...state,
                isLoaded: false
            }
        default:
            return state
    }
}

export default pizzas