import axios from 'axios'

import { FETCH_CATEGORIES, SET_LOADING } from './actionTypes'

export const fetchCategories = () => {
    return async dispatch => {
        dispatch({ type: SET_LOADING })
        try {
            const response = await axios.get('http://localhost:8189/api/v1/categories')
            dispatch({
                type: FETCH_CATEGORIES,
                payload: response.data
            })
        } catch (e) {
            console.error(e)
        }
    }
}