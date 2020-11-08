import { 
    UNIT_TYPES_SELECTED,
    BASE_UNITS_SELECTED,
    BASE_CURRENCY_SELECTED,
    UNIT_DECIMAL_PLACES_SELECTED,
    CURRENCY_DECIMAL_PLACES_SELECTED,
    PERCENTAGE_DECIMAL_PLACES_SELECTED 
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

export const changeUnitDecimalPlaces = (places) => ({
    type: UNIT_DECIMAL_PLACES_SELECTED,
    payload: places
})

export const changeCurrencyDecimalPlaces = (places) => ({
    type: CURRENCY_DECIMAL_PLACES_SELECTED,
    payload: places
})

export const changePercentageDecimalPlaces = (places) => ({
    type: PERCENTAGE_DECIMAL_PLACES_SELECTED,
    payload: places
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

const unitDecimalPlacesReducer = (state = 3, action) => {
    switch (action.type) {
        case UNIT_DECIMAL_PLACES_SELECTED:
            return parseInt(action.payload)
        default:
            return state
    }
}

const currencyDecimalPlacesReducer = (state = 2, action) => {
    switch (action.type) {
        case CURRENCY_DECIMAL_PLACES_SELECTED:
            return parseInt(action.payload)
        default:
            return state
    }
}

const percentageDecimalPlacesReducer = (state = 2, action) => {
    switch (action.type) {
        case PERCENTAGE_DECIMAL_PLACES_SELECTED:
            return parseInt(action.payload)
        default:
            return state
    }
}

const configReducer = combineReducers({
    unitType: unitTypeReducer,
    baseUnit: baseUnitsReducer,
    baseCurrency: baseCurrencyReducer,
    unitDecimalPlaces: unitDecimalPlacesReducer,
    currencyDecimalPlaces: currencyDecimalPlacesReducer,
    percentageDecimalPlaces: percentageDecimalPlacesReducer
})

export default configReducer

// SELECTORS

export const getBaseCurrency = state => state.baseCurrency

export const getBaseUnit = state => state.baseUnit

export const getUnitType = state => state.unitType

export const getUnitDecimalPlaces = state => state.unitDecimalPlaces

export const getCurrencyDecimalPlaces = state => state.currencyDecimalPlaces

export const getPercentageDecimalPlaces = state => state.percentageDecimalPlaces

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