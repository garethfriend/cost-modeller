import { combineReducers } from 'redux'
import { currencyReducer } from './currency'
import { unitsReducer } from './units'
import { errorsReducer } from './error'
import { totalQuantityReducer } from './totalQuantity'


export default combineReducers({
    currency: currencyReducer,
    units: unitsReducer,
    errors: errorsReducer,
    totalQuantity: totalQuantityReducer,
    // fixedQuant: fixedQuantReducer,
    // flexQuant: flexQuantReducer,
    // subjectQuant: subjectQuantReducer 
})
