import { CHANGE_PAGE, FETCH_PIZZAS, FETCH_PIZZA_TYPES, FETC_PIZZA_SIZES, SET_LOADING } from '../actions/actionTypes'

const initinalState = {
    items: [],
    availableTypes: [],
    availableSizes: [],
    isLoaded: false,
    pagination: { curPage: 1 }
}

const pizzas = (state = initinalState, action) => {
    switch (action.type) {
        case FETCH_PIZZAS:
            return {
                ...state,
                items: action.payload.content,
                pagination: action.payload.pagination,
                isLoaded: true
            }
        case SET_LOADING:
            return {
                ...state,
                isLoaded: false
            }
        case FETCH_PIZZA_TYPES:
            return {
                ...state,
                availableTypes: action.payload
            }
        case FETC_PIZZA_SIZES:
            return {
                ...state,
                availableSizes: action.payload
            }
        case CHANGE_PAGE:
            const pagination = state.pagination
            pagination.curPage =
                action.payload === '<'
                    ? Math.max(1, pagination.curPage - 1)
                    : action.payload === '>'
                        ? Math.min(pagination.totalPages, pagination.curPage + 1)
                        : action.payload
            return {
                ...state,
                pagination
            }
        default:
            return state
    }
}

export default pizzas