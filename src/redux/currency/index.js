import { 
    FETCH_CURRENCIES_REQUEST,
    FETCH_CURRENCIES_SUCCESS,
    FETCH_CURRENCIES_ERROR, 
    CURRENCY_SELECTED 
} from '../types'
import { combineReducers } from 'redux'
import axios from 'axios'

// API

const currency = axios.create({
    baseURL: 'https://open.exchangerate-api.com/v6/latest'
    // baseURL: 'https://v6.exchangerate-api.com/v6/YOUR-API-KEY/latest/USD'
})

// ACTIONS

const loadRatesRequest = () => ({
    type: FETCH_CURRENCIES_REQUEST,
        payload: {
            isLoading: true
        }
})
   
const loadRatesSuccess = (rates) => ({
    type: FETCH_CURRENCIES_SUCCESS,
    payload:{
        rates: rates,
        isLoading: false,
        error: null
    }
})

const loadRatesError = (error) => ({
    type: FETCH_CURRENCIES_ERROR,
    payload:{
        rates: {USD: 1},
        isLoading: false,
        error: error
    }
})

export const fetchCurrencies = () => {
    return async function(dispatch) {
        dispatch(loadRatesRequest())
        try{
            let response = (await currency.get()).data
            if(response.result === "success"){
                dispatch(loadRatesSuccess(response.rates))
            }else{
                dispatch(loadRatesError(response["error-type"]))
        }
        }catch(error){
            dispatch(loadRatesError(error.message))
        }
    }
}

export const selectBaseCurrency = (code, rates) => ({
    type: CURRENCY_SELECTED,
    payload: {
        code: code,
        baseRate: rates[code]
    }
})

// REDUCERS

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

export const currencyReducer = combineReducers({
    rates: ratesReducer,
    isLoading: loadingReducer,
    baseCurrency: selectedCurrencyReducer,
})