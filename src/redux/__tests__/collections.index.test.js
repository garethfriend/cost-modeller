import {
    CREATE_INGREDIENT,
    DELETE_INGREDIENT,
    ASSIGN_INGREDIENT
} from '../types'
import collectionsReducer, * as collections from '../collections'

// ACTION CREATOR

describe('assignIngredient', () => {
    it('has the correct type', () => {
        const action = collections.assignIngredient()

        expect(action.type).toEqual(ASSIGN_INGREDIENT)
    })

    it('has the correct payload when passed a single value', () => {
        const action = collections.assignIngredient('fixed', '945-6647-9977')

        expect(action.payload).toHaveProperty('ids', ['945-6647-9977'])
        expect(action.payload).toHaveProperty('collection', 'fixed')        
    })

    it('has the correct payload when passed an array of values', () => {
        const action = collections.assignIngredient('fixed', ['945-6647-9977', '945-6647-9966'])

        expect(action.payload).toHaveProperty('ids', ['945-6647-9977', '945-6647-9966'])
        expect(action.payload).toHaveProperty('collection', 'fixed')        
    })
})

// REDUCER

describe('initialization', () => {
    it('initializes with the correct state shape and default values', () => {
        const state = collectionsReducer({}, {type: 'test'})

        expect(state).toHaveProperty('variable', [])
        expect(state).toHaveProperty('fixed', [])
        expect(state).toHaveProperty('balance', [])
    })
})

describe('handling actions', () => {
    const initialState = {
        variable: ['945-6647-9977'],
        fixed: ['154-6876-8443', '249-8388-8355', '033-0058-1111'],
        balance: ['158-2987-3546', 'MOVER'],
    }

    it('handles action type ASSIGN_INGREDIENT correctly with single values for id', () => {
        const id = 'MOVER'
        
        const actionA = {
            type: ASSIGN_INGREDIENT,
            payload: {
                ids: [id],
                collection: 'fixed'
            }
        }
        
        const actionB = {
            type: ASSIGN_INGREDIENT,
            payload: {
                ids: [id],
                collection: 'variable'
            }
        }

        const actionC = {
            type: ASSIGN_INGREDIENT,
            payload: {
                ids: [id],
                collection: 'balance'
            }
        }

        const newStateA = collectionsReducer(initialState, actionA)

        expect(newStateA.variable).toEqual(['945-6647-9977'])
        expect(newStateA.fixed).toEqual(['154-6876-8443', '249-8388-8355', '033-0058-1111', 'MOVER'])
        expect(newStateA.balance).toEqual(['158-2987-3546'])

        const newStateB = collectionsReducer(newStateA, actionB)
        expect(newStateB.variable).toEqual(['945-6647-9977', 'MOVER'])
        expect(newStateB.fixed).toEqual(['154-6876-8443', '249-8388-8355', '033-0058-1111'])
        expect(newStateB.balance).toEqual(['158-2987-3546'])
        
        const newStateC = collectionsReducer(newStateB, actionC)
        expect(newStateC.variable).toEqual(['945-6647-9977'])
        expect(newStateC.fixed).toEqual(['154-6876-8443', '249-8388-8355', '033-0058-1111'])
        expect(newStateC.balance).toEqual(['158-2987-3546', 'MOVER'])

    })

    it('handles action type ASSIGN_INGREDIENT correctly with array of ids', () => {
                
        const actionA = {
            type: ASSIGN_INGREDIENT,
            payload: {
                ids: ['033-0058-1111', 'MOVER'],
                collection: 'variable'
            }
        }
        
        const actionB = {
            type: ASSIGN_INGREDIENT,
            payload: {
                ids: ['945-6647-9977', '154-6876-8443'],
                collection: 'balance'
            }
        }

        const actionC = {
            type: ASSIGN_INGREDIENT,
            payload: {
                ids: [ '033-0058-1111', 'MOVER' ],
                collection: 'fixed'
            }
        }

        const newStateA = collectionsReducer(initialState, actionA)

        expect(newStateA.variable).toEqual(['945-6647-9977', '033-0058-1111', 'MOVER'])
        expect(newStateA.fixed).toEqual(['154-6876-8443', '249-8388-8355'])
        expect(newStateA.balance).toEqual(['158-2987-3546'])

        const newStateB = collectionsReducer(newStateA, actionB)
        expect(newStateB.variable).toEqual(['033-0058-1111', 'MOVER'])
        expect(newStateB.fixed).toEqual(['249-8388-8355'])
        expect(newStateB.balance).toEqual(['158-2987-3546', '945-6647-9977', '154-6876-8443'])
        
        const newStateC = collectionsReducer(newStateB, actionC)
        expect(newStateC.variable).toEqual([])
        expect(newStateC.fixed).toEqual(['249-8388-8355', '033-0058-1111', 'MOVER'])
        expect(newStateC.balance).toEqual(['158-2987-3546', '945-6647-9977', '154-6876-8443'])

    })

    it('handles DELETE_INGREDIENT action correctly', () => {
        const actionA = {
            type: DELETE_INGREDIENT,
            payload: ['033-0058-1111', 'MOVER']
        }

        const newStateA = collectionsReducer(initialState, actionA)

        expect(newStateA.variable).toEqual(['945-6647-9977'])
        expect(newStateA.fixed).toEqual(['154-6876-8443', '249-8388-8355'])
        expect(newStateA.balance).toEqual(['158-2987-3546'])

    })

    it('handles CREATE_INGREDIENT action correctly', () => {
        const actionA = {
            type: CREATE_INGREDIENT,
            payload: {
                id: 'NEW ID',
                collection: 'variable'
            }
        }
        const newStateA = collectionsReducer(initialState, actionA)

        expect(newStateA.variable).toEqual(['945-6647-9977', 'NEW ID'])
        expect(newStateA.fixed).toEqual(['154-6876-8443', '249-8388-8355', '033-0058-1111'])
        expect(newStateA.balance).toEqual(['158-2987-3546', 'MOVER'])
    })
})
