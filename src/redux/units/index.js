import { BASE_UNITS_SELECTED, UNITS_SELECTED } from '../types'
import { mass, volume } from 'units-converter'

// ACTIONS

export const selectBaseUnits = (units) => {
    if (units === 'mass') {
        return {
            type: BASE_UNITS_SELECTED,
            payload: {
                unitTypes: units,
                definitions: mass().list()
            }
        }
    } else if (units === 'volume') {
        return {
            type: BASE_UNITS_SELECTED,
            payload: {
                unitTypes: units,
                definitions: volume().list()
            }
        }
    }
    return []    
}

export const selectUnits = (id, unit) => ({
    type: UNITS_SELECTED,
    payload: {
        ingredientId: id,
        selectedUnit: unit
    }
})

// REDUCERS

const INITIAL_UNITS = {
    unitTypes: 'mass',
    definitions: mass().list()
}

export const unitsReducer = (units = INITIAL_UNITS, action) => {
    if (action.type === BASE_UNITS_SELECTED) {
        return action.payload
    }
    return units
}

