import { CLOSE_ALERT, SHOW_ALERT } from './actionTypes'

export const showAlert = message => {
    return {
        type: SHOW_ALERT,
        payload: message
    }
}

export const closeAlert = () => {
    return {
        type: CLOSE_ALERT
    }
}