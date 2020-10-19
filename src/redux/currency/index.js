import { combineReducers } from 'redux'
import axios from 'axios'

import { 
    FETCH_CURRENCIES_REQUEST,
    FETCH_CURRENCIES_SUCCESS,
    FETCH_CURRENCIES_ERROR 
} from '../types'
import codes from '../../assets/codes'

// CONSTANTS

const INITIAL_RATES = Object.fromEntries(Object.keys(codes).map((code) => [code, 1])) // default all exchange rates to 1 if not replaced by API data

// ACTIONS

const loadRatesRequest = () => ({
    type: FETCH_CURRENCIES_REQUEST,
        payload: {
            timeStamp: null,
            isLoading: true
        }
})
   
const loadRatesSuccess = (data) => ({
    type: FETCH_CURRENCIES_SUCCESS,
    payload:{
        rates: data.rates,
        timeStamp: data.timeStamp,
        isLoading: false,
        error: null
    }
})

const loadRatesError = (error) => ({
    type: FETCH_CURRENCIES_ERROR,
    payload:{
        rates: INITIAL_RATES,
        timeStamp: null,
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
                dispatch(loadRatesSuccess({ rates: response.rates, timeStamp: response.time_last_update_utc }))
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

const timeStampReducer = (timeStamp = null, action) => {
    switch (action.type) {
        case FETCH_CURRENCIES_SUCCESS:
        case FETCH_CURRENCIES_ERROR:
        case FETCH_CURRENCIES_REQUEST:
            return action.payload.timeStamp
        default:
            return timeStamp
    }
}

const currencyReducer = combineReducers({
    rates: ratesReducer,
    isLoading: loadingReducer,
    timeStamp: timeStampReducer,
})

export default currencyReducer

// SELECTORS

export const getRates = state => state.rates
export const getLoadingStatus = state => state.isLoading


