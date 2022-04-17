import axios from 'axios'
import {
    CHANGE_PAGE,
    FETCH_PIZZAS,
    FETCH_PIZZA_TYPES,
    FETC_PIZZA_SIZES,
    SET_LOADING
} from './actionTypes'
import { showAlert } from './alerts'

const API_URL = process.env.REACT_APP_API_URL

export const fetchPizzas = (params) => {
    return async dispatch => {
        dispatch({ type: SET_LOADING })
        try {
            const response = await axios.get(`${API_URL}/pizzas${params}`)
            dispatch({
                type: FETCH_PIZZAS,
                payload: {
                    content: response.data.content,
                    pagination: {
                        curPage: response.data.number + 1,
                        totalPages: response.data.totalPages,
                        numberOfElements: response.data.numberOfElements
                    }
                }
            })
        } catch (e) {
            dispatch(showAlert(e.stack))
        }
    }
}

export const fetchPizzaTypes = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`${API_URL}/pizzas/types`)
            dispatch({
                type: FETCH_PIZZA_TYPES,
                payload: response.data
            })
        } catch (e) {
            dispatch(showAlert(e.stack))
        }
    }
}

export const fetchPizzaSizes = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`${API_URL}/pizzas/sizes`)
            dispatch({
                type: FETC_PIZZA_SIZES,
                payload: response.data
            })
        } catch (e) {
            dispatch(showAlert(e.stack))
        }
    }
}

export const changePage = page => {
    return {
        type: CHANGE_PAGE,
        payload: page
    }
}