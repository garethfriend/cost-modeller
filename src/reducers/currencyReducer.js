import { 
    FETCH_CURRENCIES_SUCCESS, 
    FETCH_CURRENCIES_ERROR, 
    FETCH_CURRENCIES_REQUEST,
    CURRENCY_SELECTED 
} from '../actions/types'
import { combineReducers } from 'redux'

const INITIAL_STATE = {}

const ratesReducer = (currency = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_CURRENCIES_SUCCESS:
        case FETCH_CURRENCIES_ERROR:
            return action.payload.rates
        default:
            return currency
    }
}

const loadingReducer = (isLoading = true, action) => {
    switch (action.type) {
        case FETCH_CURRENCIES_SUCCESS:
        case FETCH_CURRENCIES_ERROR:
        case FETCH_CURRENCIES_REQUEST:
            return action.payload.isLoading
        default:
            return isLoading
    }
}

const INITIAL_CURRENCY = {
    code: 'USD',
    baseRate: 1
}

const selectedCurrencyReducer = (baseCurrency = INITIAL_CURRENCY, action) => {
    if (action.type === CURRENCY_SELECTED) {
        return action.payload
    }

    return baseCurrency
}

export default combineReducers({
    rates: ratesReducer,
    isLoading: loadingReducer,
    baseCurrency: selectedCurrencyReducer,
})