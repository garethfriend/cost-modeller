import {
    v4 as uuidv4
} from 'uuid'
import {
    CREATE_INGREDIENT,
    EDIT_INGREDIENT,
    DELETE_INGREDIENT,
    ASSIGN_INGREDIENT,
    OPEN_INGREDIENT,
    CLOSE_INGREDIENT,
} from '../types'


// ACTIONS

export const createIngredient = (collection, data) => ({
    type: CREATE_INGREDIENT,
    payload: {
        id: uuidv4(),
        collection: collection,
        data: data
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

export const editIngredient = (id, data) => ({
    type: EDIT_INGREDIENT,
    payload: {
        id: id,
        data: data
    }
})

export const deleteIngredient = (id) => ({
    type: DELETE_INGREDIENT,
    payload: id
})

export const assignIngredient = (id, collection) => ({
    type: ASSIGN_INGREDIENT,
    payload: {
        id: id,
        collection: collection // 'variable' 'fixed' or 'balance'
    }
})

// REDUCERS

const mapIngredientProps = (action) => ({
    id: action.payload.id,
    ingredientName: action.payload.data.ingredientName,
    pricedInCurrency: action.payload.data.pricedInCurrency,
    cost: parseFloat(action.payload.data.cost),
    numberOfUnits: parseFloat(action.payload.data.numberOfUnits),
    unit: action.payload.data.unit,
    quantity: parseFloat(action.payload.data.quantity),
    editing: false
})

const ingredientReducer = (state = [], action) => {
    switch (action.type) {
        case CREATE_INGREDIENT:
            return [...state, mapIngredientProps(action)]
        case OPEN_INGREDIENT:
            return state.map(ingredient => {
                if (ingredient.id === action.payload.id) {
                    return {
                        ...ingredient,
                        editing: true
                    }
                }
                return {
                    ...ingredient,
                    editing: false
                }
            })
        case CLOSE_INGREDIENT:
            return state.map(ingredient => {
                if (ingredient.id === action.payload.id) {
                    return {
                        ...ingredient,
                        editing: false
                    }
                }
                return ingredient
            })
        case EDIT_INGREDIENT:
            return [...state, mapIngredientProps(action)]
        case DELETE_INGREDIENT:
            return state.filter(ingredient => ingredient.id !== action.payload)
        default:
            return state
    }
}

export default ingredientReducer

// SELECTORS

