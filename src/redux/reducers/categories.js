import { FETCH_CATEGORIES, SET_LOADING } from "../actions/actionTypes"

const initialState = {
    items: [{ id: 0, name: 'Все' }],
    isLoaded: false
}

const categories = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CATEGORIES:
            return {
                ...state,
                items: [{ id: 0, name: 'Все' }, ...action.payload],
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

export default categories