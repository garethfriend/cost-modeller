import { 
    FETCH_CURRENCIES_REQUEST,
    FETCH_CURRENCIES_SUCCESS,
    FETCH_CURRENCIES_ERROR 
} from '../types'
import { combineReducers } from 'redux'
import axios from 'axios'
import codes from '../../codes'

// CONSTANTS

const INITIAL_RATES = Object.fromEntries(Object.keys(codes).map((code) => [code, 1])) // default all exchange rates to 1 if not replaced by API data

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
            let response = (await axios.get('https://open.exchangerate-api.com/v6/latest')).data
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
export const getLoadingStatus = state => state.isLoading


