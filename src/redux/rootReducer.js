import { combineReducers } from 'redux'
import currencyReducer from './currency'
import configReducer from './config'
import errorsReducer from './error'
import collectionsReducer from './collections'
import ingredientReducer from './ingredient'
import modelReducer from './model'



export default combineReducers({
    currency: currencyReducer,
    config: configReducer,
    errors: errorsReducer,
    collections: collectionsReducer,
    ingredients: ingredientReducer,
    model: modelReducer
})

