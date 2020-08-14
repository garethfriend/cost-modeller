import {
    TOTAL_QUANTITY_CHANGE,
    TOTAL_QUANTITY_UNITS_CHANGE
} from '../types'
import {combineReducers} from 'redux'

// ACTIONS

export const totalQuantityChange = (quantity) =>  ({
    type: TOTAL_QUANTITY_CHANGE,
    payload: {
        quantity: quantity
    }
})

export const totalQuantityUnitsChange = (unit) =>  ({
    type: TOTAL_QUANTITY_UNITS_CHANGE,
    payload: {
        unit: unit
    }
})

// REDUCERS

const unitReducer = (unit = 'g', action) => {
    if (action.type === TOTAL_QUANTITY_UNITS_CHANGE) {
        return action.payload
    }

    return unit
}

const quantityReducer = (quantity = '', action) => {
    if (action.type === TOTAL_QUANTITY_CHANGE) {
        return action.payload.quantity
    }

    return quantity
}

export const totalQuantityReducer = combineReducers({
    unit: unitReducer,
    quantity: quantityReducer,
})