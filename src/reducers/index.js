import { combineReducers } from 'redux'
import currencyReducer from './currencyReducer'
import unitsReducer from './unitsReducer'
import 'semantic-ui-css/semantic.min.css'
import { errorsReducer } from './errorsReducer'


export default combineReducers({
    currency: currencyReducer,
    units: unitsReducer,
    errors: errorsReducer,
    // fixedQuant: fixedQuantReducer,
    // flexQuant: flexQuantReducer,
    // subjectQuant: subjectQuantReducer 
})