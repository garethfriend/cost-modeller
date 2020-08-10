import { combineReducers } from 'redux'
import currencyReducer from './currencyReducer'
import unitsReducer from './unitsReducer'
import 'semantic-ui-css/semantic.min.css'
import errorsReducer from './errorsReducer'
import totalQuantityReducer from './totalQuantityReducer'


export default combineReducers({
    currency: currencyReducer,
    units: unitsReducer,
    errors: errorsReducer,
    totalQuantity: totalQuantityReducer,
    // fixedQuant: fixedQuantReducer,
    // flexQuant: flexQuantReducer,
    // subjectQuant: subjectQuantReducer 
})