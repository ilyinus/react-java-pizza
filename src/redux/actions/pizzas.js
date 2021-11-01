import axios from 'axios'
import { FETCH_PIZZAS, SET_LOADING } from './actionTypes'

export const fetchPizzas = (params) => {
    return async dispatch => {
        dispatch({ type: SET_LOADING })
        try {
            const response = await axios.get('/pizzas' + params)
            dispatch({
                type: FETCH_PIZZAS,
                payload: response.data
            })
        } catch (e) {
            console.error(e)
        }
    }
}