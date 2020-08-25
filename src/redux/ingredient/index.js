import { v4 as uuidv4 } from 'uuid'
import {
    CREATE_INGREDIENT,
    EDIT_INGREDIENT,
    DELETE_INGREDIENT,
    ASSIGN_INGREDIENT,
    OPEN_INGREDIENT,
    CLOSE_INGREDIENT,
    // these affect derived state
    // BASE_UNITS_SELECTED,
    // CURRENCY_SELECTED,
    // TOTAL_QUANTITY_UNITS_CHANGE
} from '../types'


// ACTIONS

export const createIngredient = () => ({
    type: CREATE_INGREDIENT,
    payload: {
        id: uuidv4()
    }
})

export const openIngredient = (id) => ({
    type: OPEN_INGREDIENT,
    payload: id
})

export const closeIngredient = (id) => ({
    type: CLOSE_INGREDIENT,
    payload: id
})

export const editIngredient = (id) => ({
    type: EDIT_INGREDIENT,
    payload: {}
})

export const deleteIngredient = (id) => ({
    type: DELETE_INGREDIENT,
    payload: id
})

export const assignIngredient = (id, column) => ({
    type: ASSIGN_INGREDIENT,
    payload: {
        id: id,
        column: column
    }
})

// REDUCERS

const INITIAL_STATE = [
    {
        id: 1,
        column: 'flex', // fixed or subject - comes from paayload
        ingredientName: 'water', // comes from payload
        pricedInCurrency: 'USD', // comes from payload
        cost: 1, // price in pricedInCurrency for quantity defined i.e. 1 USD / quantity - comes from payload
        unit: 'g', // units for the cost basis i.e. 1 USD / g - comes from payload
        numberOfUnits: 100, // number of units cost is based on i.e. 1 USD / 100g - comes from payload
        quantity: 100, // this much is present (unconverted) - comes from payload
        quantityUnits: 'kg', // in these units - comes from payload
        normalizedCost: 0.01, // to be the cost converted to global basecurrency / baseunit - calcualte in reducer
        normalizedUnit: 0.1, // how much of it is actually present in baseunits - calculate in reducer
        editing: true
    }
] 



export const ingredientReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CREATE_INGREDIENT:
            return [...state, action.payload]
        case OPEN_INGREDIENT:
            return state.map(ingredient => {
                if (ingredient.id === action.payload.id) {
                  return {...ingredient, editing: true}
                }
                return {...ingredient, editing: false}
              })
        case CLOSE_INGREDIENT:
            return state.map(ingredient => {
                if (ingredient.id === action.payload.id) {
                  return {...ingredient, editing: false}
                }
                return ingredient
              })
        case EDIT_INGREDIENT:
            return [...state, action.payload]
        case DELETE_INGREDIENT:
            return state.filter(ingredient => ingredient.id !== action.payload)
        case ASSIGN_INGREDIENT:
            return []
        default:
            return state
    }
}