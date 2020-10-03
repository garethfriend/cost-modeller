import {
    v4 as uuidv4
} from 'uuid'
import {
    CREATE_INGREDIENT,
    EDIT_INGREDIENT,
    DELETE_INGREDIENT,
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

export const editIngredient = (id, collection, data) => ({
    type: EDIT_INGREDIENT,
    payload: {
        id: id,
        collection: collection,
        data: data
    }
})

export const deleteIngredient = (ids) => {
    const idsArray = [].concat(ids)    
    return {
        type: DELETE_INGREDIENT,
        payload: idsArray
    }
}

// REDUCERS

const mapIngredientProps = (action) => ({
    id: action.payload.id,
    ingredientName: action.payload.data.ingredientName,
    pricedInCurrency: action.payload.data.pricedInCurrency,
    cost: parseFloat(action.payload.data.cost),
    numberOfUnits: parseFloat(action.payload.data.numberOfUnits),
    unit: action.payload.data.unit,
    quantity: parseFloat(action.payload.data.quantity),
})

const ingredientReducer = (state = [], action) => {
    switch (action.type) {
        case CREATE_INGREDIENT:
            return [...state, mapIngredientProps(action)]
        case EDIT_INGREDIENT:
            return [...state, mapIngredientProps(action)]
        case DELETE_INGREDIENT:
            return state.filter(ingredient => !action.payload.includes(ingredient.id))
        default:
            return state
    }
}

export default ingredientReducer


