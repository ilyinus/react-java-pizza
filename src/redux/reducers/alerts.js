import { CLOSE_ALERT, SHOW_ALERT } from '../actions/actionTypes'

const initialState = {
    message: '',
    isShown: false
}

const alerts = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_ALERT:
            return {
                ...state,
                message: action.payload,
                isShown: true
            }
        case CLOSE_ALERT:
            return {
                ...state,
                message: '',
                isShown: false
            }
        default:
            return state
    }
}

export default alerts