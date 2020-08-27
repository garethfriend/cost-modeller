import {
    CREATE_INGREDIENT,
    DELETE_INGREDIENT,
    ASSIGN_INGREDIENT
} from '../types'
import {combineReducers} from 'redux'

// ACTIONS

export const assignIngredient = (collection, id) => ({
    type: ASSIGN_INGREDIENT,
    payload: {
        id: id,
        collection: collection
    }
})

// REDUCERS

const collectionAssign = (state, collectionName, action) => {
    if (action.payload.collection === collectionName && state.indexOf(action.payload.id) === -1) {
        return [...state, action.payload.id]
    } else if (action.payload.collection !== collectionName && state.indexOf(action.payload.id) > -1) {
        return state.filter(id => id !== action.payload.id)
    } else {
        return state
    }
} 

const createCollectionReducer = collectionName => (state = [], action) => {
    switch (action.type) {
        case ASSIGN_INGREDIENT:
            return collectionAssign(state, collectionName, action)
        case CREATE_INGREDIENT:
            return action.payload.collection === collectionName ? [...state, action.payload.id] : state
        case DELETE_INGREDIENT:
            return state.filter(id => id !== action.payload)
        default:
            return state
    }

}

const collectionsReducer = combineReducers({
    // this is what we are modelling the changes to
    variable: createCollectionReducer('variable'),
    // this portion's fraction does not change - no matter what else we mess with ingredients in here are fixed quantity
    fixed: createCollectionReducer('fixed'),
    // this portion grows and shrinks to accomodate the changes in the variable quantity
    balance: createCollectionReducer('balance'),
})

export default collectionsReducer

// SELECTORS