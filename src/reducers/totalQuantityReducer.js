import {
    TOTAL_QUANTITY_CHANGE,
    TOTAL_QUANTITY_UNITS_CHANGE
} from '../actions/types'
import {combineReducers} from 'redux'

const unitReducer = (unit = 'g', action) => {
    if (action.type === TOTAL_QUANTITY_UNITS_CHANGE) {
        return action.payload
    }

    return unit
}

const quantityReducer = (quantity = '', action) => {
    if (action.type === TOTAL_QUANTITY_CHANGE) {
        return action.payload
    }

    return quantity
}

export default combineReducers({
    unit: unitReducer,
    quantity: quantityReducer,
})