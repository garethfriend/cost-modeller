import {
    TOTAL_QUANTITY_CHANGE,
    TOTAL_QUANTITY_UNITS_CHANGE,
    BASE_UNITS_SELECTED
} from '../types'
import {combineReducers} from 'redux'

// ACTIONS

export const totalQuantityChange = (quantity) =>  ({
    type: TOTAL_QUANTITY_CHANGE,
    payload: quantity
})

export const totalQuantityUnitsChange = (unit) =>  ({
    type: TOTAL_QUANTITY_UNITS_CHANGE,
    payload: unit
})

// REDUCERS

const unitReducer = (unit = 'g', action) => {
    switch (action.type) {
        case TOTAL_QUANTITY_UNITS_CHANGE:
            return action.payload
        case BASE_UNITS_SELECTED:
            return action.payload.definitions[1].unit
        default:
            return unit
    }
}

const quantityReducer = (quantity = '', action) => {
    if (action.type === TOTAL_QUANTITY_CHANGE) {
        return parseFloat(action.payload)
    }

    return quantity
}

export const totalQuantityReducer = combineReducers({
    unit: unitReducer,
    quantity: quantityReducer,
})