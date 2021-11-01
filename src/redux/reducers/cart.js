import { ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART } from "../actions/actionTypes"

const initialState = {
    items: {},
    itemsCount: {},
    totalPrice: 0,
    totalCount: 0
}

const cart = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return addRemoveCartItem(state, action.payload)
        case REMOVE_FROM_CART:
            return addRemoveCartItem(state, action.payload, true)
        case CLEAR_CART:
            return initialState
        default:
            return state
    }
}

const addRemoveCartItem = (state, item, remove = false) => {

    const id = `${item.id}_${item.type}_${item.size}`
    const factor = remove ? -1 : 1
    const count = item.count * factor

    const items = {
        ...state.items,
        [id]: !state.items[id]
            ? item
            : {
                ...state.items[id],
                count: state.items[id].count + count
            }
    }

    const itemsCount = {
        ...state.itemsCount,
        [item.id]: !state.itemsCount[item.id]
            ? { count: item.count }
            : { count: state.itemsCount[item.id].count + count }
    }

    if (items[id].count === 0) {
        delete items[id]
    }

    if (itemsCount[item.id].count === 0) {
        delete itemsCount[item.id]
    }

    const totalPrice = Object.values(items).reduce((sum, item) => sum += item.price * item.count, 0)
    const totalCount = Object.values(items).reduce((count, item) => count += item.count, 0)

    return {
        ...state,
        items,
        itemsCount,
        totalPrice,
        totalCount
    }
}

export default cart