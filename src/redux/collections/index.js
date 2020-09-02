import {
    CREATE_INGREDIENT,
    DELETE_INGREDIENT,
    ASSIGN_INGREDIENT
} from '../types'
import {combineReducers} from 'redux'

// ACTIONS

export const assignIngredient = (collection, ids) => {
    const idsArray = [].concat(ids) // allows passing of a single value or array
    return {
        type: ASSIGN_INGREDIENT,
        payload: {
            ids: idsArray,
            collection: collection
        }
    }
}
    

// REDUCERS

const collectionAssign = (state, collectionName, action) => {
    // if this is the collection they are being assigned to only add the ids not already present
    if (action.payload.collection === collectionName) {
        return [...state, ...action.payload.ids.filter(id => !state.includes(id))]
    // if this is not the collection they are being assigned to remove those ids that are present in the payload
    } else if (action.payload.collection !== collectionName) {
        return state.filter(id => !action.payload.ids.includes(id))
    } else {
        return state
    }
} 

// TO DO - make delete work with arrays
const createCollectionReducer = collectionName => (state = [], action) => {
    switch (action.type) {
        case ASSIGN_INGREDIENT:
            return collectionAssign(state, collectionName, action)
        case CREATE_INGREDIENT:
            return action.payload.collection === collectionName ? [...state, action.payload.id] : state
        case DELETE_INGREDIENT:
            return state.filter(id => !action.payload.includes(id))
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

export const getVariableIds = state => state.variable
export const getFixedIds = state => state.fixed
export const getBalanceIds = state => state.balance