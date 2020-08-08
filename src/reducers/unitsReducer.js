import { UNITS_SELECTED } from '../actions/types'
import { mass } from 'units-converter'

const INITIAL_UNITS = {
    unitTypes: 'mass',
    definitions: mass().list()
}

const unitsReducer = (units = INITIAL_UNITS, action) => {
    if (action.type === UNITS_SELECTED) {
        return action.payload
    }
    return units
}

export default unitsReducer
