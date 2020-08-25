import { BASE_UNITS_SELECTED } from '../types'
import { mass, volume } from 'units-converter'

// ACTIONS

const createDefinitionList = (selectedUnits) => {
    if(selectedUnits === 'volume') {
        return volume().list()
    } else {
        return mass().list() 
    }
}

// action creator creates list of definitions so that other reducers can see the action and pull values from it too
export const selectBaseUnits = (units) => {
    const list = createDefinitionList(units)
    return ({
        type: BASE_UNITS_SELECTED,
        payload: {
            unitTypes: units,
            definitions: list
        }
    })
}

// REDUCERS

const INITIAL_UNITS = {
    unitTypes: 'mass',
    definitions: mass().list()
}

export const unitsReducer = (units = INITIAL_UNITS, action) => {
    switch (action.type) {
        case BASE_UNITS_SELECTED:
            return action.payload
        default:
            return units
    }
}

