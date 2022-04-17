import { SET_CATEGORY, SET_SORTING, SET_SORT_BY } from '../actions/actionTypes'

const initialState = {
    category: { id: 0, name: 'Все' },
    sorting: 'raiting',
    sortBy: 'desc'
}

const filters = (state = initialState, action) => {
    switch (action.type) {
        case SET_CATEGORY:
            return {
                ...state,
                category: action.payload
            }
        case SET_SORTING:
            return {
                ...state,
                sorting: action.payload
            }
        case SET_SORT_BY:
            return {
                ...state,
                sortBy: action.payload
            }
        default:
            return state
    }
}

export default filters