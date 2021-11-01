import { SET_CATEGORY, SET_SORTING, SET_SORT_BY } from './actionTypes'

export const setCategory = index => {
    return {
        type: SET_CATEGORY,
        payload: index
    }
}

export const setSorting = sorting => {
    return {
        type: SET_SORTING,
        payload: sorting
    }
}

export const setSortBy = sortBy => {
    return {
        type: SET_SORT_BY,
        payload: sortBy
    }
}