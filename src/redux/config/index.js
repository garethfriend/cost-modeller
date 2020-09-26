import { 
    UNIT_TYPES_SELECTED,
    BASE_UNITS_SELECTED,
    BASE_CURRENCY_SELECTED 
} from '../types'
import { combineReducers } from 'redux'
import { createSelector } from 'reselect'
import { mass, volume } from 'units-converter'

// ACTIONS

export const changeUnitType = (type) => ({
    type: UNIT_TYPES_SELECTED,
    payload: type
})

export const changeBaseUnits = (unit) => ({
    type: BASE_UNITS_SELECTED,
    payload: unit
})

export const changeBaseCurrency = (code) => ({
    type: BASE_CURRENCY_SELECTED,
    payload: code
})

// REDUCERS

const unitTypeReducer = (state = 'mass', action) => {
    switch (action.type) {
        case UNIT_TYPES_SELECTED:
            return action.payload
        default:
            return state
    }
}

const baseUnitsReducer = (state = 'g', action) => {
    switch (action.type) {
        case BASE_UNITS_SELECTED:
            return action.payload
        case UNIT_TYPES_SELECTED:
            return action.payload === 'mass' ? 'g' : 'ml'
        default:
            return state
    }
}

const baseCurrencyReducer = (state = 'USD', action) => {
    switch (action.type) {
        case BASE_CURRENCY_SELECTED:
            return action.payload
        default:
            return state
    }
}

const configReducer = combineReducers({
    unitType: unitTypeReducer,
    baseUnit: baseUnitsReducer,
    baseCurrency: baseCurrencyReducer
})

export default configReducer

// SELECTORS

export const getBaseCurrency = state => state.baseCurrency

export const getBaseUnit = state => state.baseUnit

export const getUnitType = state => state.unitType

/**
 * Function to retrun the appropriate unitTypes definitions object based on the value of config.unitType piece of state.
 * @function getUnitDefinitions
 * @param {object} state - redux state object.
 * @returns {object} - Unit type definitions object.
 */
export const getUnitDefinitions = createSelector(
    getUnitType,
    (unitType) => {
        switch (unitType) {
            case 'volume':
                return volume().list()
            case 'mass':
            default:
                return mass().list() 
        }
    }
)