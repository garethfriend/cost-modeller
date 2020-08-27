import { 
    FETCH_CURRENCIES_REQUEST,
    FETCH_CURRENCIES_SUCCESS,
    FETCH_CURRENCIES_ERROR 
} from '../types'
import { combineReducers } from 'redux'
import axios from 'axios'
import codes from '../../codes'
import { createSelector } from 'reselect'

// CONSTANTS

const INITIAL_RATES = Object.keys(codes).forEach(code => codes[code] = 1) // default all exchange rates to 1 if not replaced by API data

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
        rates: INITIAL_RATES,
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

// REDUCERS

const ratesReducer = (currency = INITIAL_RATES, action) => {
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

const currencyReducer = combineReducers({
    rates: ratesReducer,
    isLoading: loadingReducer,
})

export default currencyReducer

// SELECTORS

export const getRates = state => state.rates


