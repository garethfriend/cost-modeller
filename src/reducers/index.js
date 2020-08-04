import { combineReducers } from 'redux'
import { currenciesReducer, selectedCurrencyReducer } from './currencyReducer'


export default combineReducers({
    currencies: currenciesReducer,
    selectedCurrency: selectedCurrencyReducer
})