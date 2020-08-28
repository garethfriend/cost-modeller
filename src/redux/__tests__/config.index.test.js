import { 
    UNIT_TYPES_SELECTED,
    BASE_UNITS_SELECTED,
    BASE_CURRENCY_SELECTED 
} from '../types'
import configReducer, * as config from '../config'

// ACTION CREATORS

describe('changeUnitType', () => {
    it('has the correct type', () => {
        const action = config.changeUnitType()

        expect(action.type).toEqual(UNIT_TYPES_SELECTED)
    })

    it('has the correct payload', () => {
        const action = config.changeUnitType('mass')

        expect(action.payload).toEqual('mass')        
    })
})

describe('changeBaseUnits', () => {
    it('has the correct type', () => {
        const action = config.changeBaseUnits()

        expect(action.type).toEqual(BASE_UNITS_SELECTED)
    })

    it('has the correct payload', () => {
        const action = config.changeBaseUnits('g')

        expect(action.payload).toEqual('g')        
    })
})

describe('changeBaseCurrency', () => {
    it('has the correct type', () => {
        const action = config.changeBaseCurrency()

        expect(action.type).toEqual(BASE_CURRENCY_SELECTED)
    })

    it('has the correct payload', () => {
        const action = config.changeBaseCurrency('GBP')

        expect(action.payload).toEqual('GBP')        
    })
})

// REDUCER

describe('initialization', () => {
    it('initializes with the correct state shape and default values', () => {
        const state = configReducer({}, {type: 'test'})

        expect(state).toHaveProperty('unitType', 'mass')
        expect(state).toHaveProperty('baseUnit', 'g')
        expect(state).toHaveProperty('baseCurrency', 'USD')
    })
})

describe('handling actions', () => {
    let state

    beforeEach(() => {
        state = configReducer({}, {type: 'test'})
    })

    it('handles action type UNIT_TYPES_SELECTED correctly', () => {
        const action = {
            type: UNIT_TYPES_SELECTED,
            payload: 'volume'
        }

        const newState = configReducer(state, action)

        expect(newState).toHaveProperty('unitType', 'volume')
        expect(newState).toHaveProperty('baseUnit', 'g')
        expect(newState).toHaveProperty('baseCurrency', 'USD')

    })

    it('handles action type BASE_UNITS_SELECTED correctly', () => {
        const action = {
            type: BASE_UNITS_SELECTED,
            payload: 'kg'
        }

        const newState = configReducer(state, action)

        expect(newState).toHaveProperty('unitType', 'mass')
        expect(newState).toHaveProperty('baseUnit', 'kg')
        expect(newState).toHaveProperty('baseCurrency', 'USD')

    })

    it('handles action type BASE_CURRENCY_SELECTED correctly', () => {
        const action = {
            type: BASE_CURRENCY_SELECTED,
            payload: 'GBP'
        }

        const newState = configReducer(state, action)

        expect(newState).toHaveProperty('unitType', 'mass')
        expect(newState).toHaveProperty('baseUnit', 'g')
        expect(newState).toHaveProperty('baseCurrency', 'GBP')

    })

    it('handles unknown action type correctly', () => {
        const newState = configReducer(state, { type: 'unknown'})

        expect(newState).toHaveProperty('unitType', 'mass')
        expect(newState).toHaveProperty('baseUnit', 'g')
        expect(newState).toHaveProperty('baseCurrency', 'USD')
    })
})

// SELECTOR - test memoized selector only

describe('getUnitDefinitions', () => {
    let state

    beforeEach(() => {
        state = configReducer({}, {type: 'test'})
    })

    it('returns an array of objects with the correct length', () => {
        const definitions = config.getUnitDefinitions(state)

        expect(definitions).toHaveLength(8)
        expect(definitions[0]).toHaveProperty('unit', 'mcg')
    })

    it('returns a different array if the unitTypes are changed', () => {
        let definitions = config.getUnitDefinitions(state)
        const newState = configReducer(state, { type: UNIT_TYPES_SELECTED, payload: 'volume' })
        const newDefinitions = config.getUnitDefinitions(newState)

        expect(newDefinitions.length).not.toEqual(definitions.length)
        expect(newDefinitions[0]).toHaveProperty('unit', 'mm3')
    });
})