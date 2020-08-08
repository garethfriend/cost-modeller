import currency from '../apis/currency'
import { 
    FETCH_CURRENCIES_REQUEST,
    FETCH_CURRENCIES_SUCCESS,
    FETCH_CURRENCIES_ERROR, 
    CURRENCY_SELECTED, 
    UNITS_SELECTED 
} from './types'
import { mass, volume } from 'units-converter'

export function loadRatesRequest(){
    return {
        type: FETCH_CURRENCIES_REQUEST,
        payload: {
            isLoading: true
        }    
    }
}
   
export function loadRatesSuccess(rates){
    return {
        type: FETCH_CURRENCIES_SUCCESS,
        payload:{
            rates: rates,
            isLoading: false,
            error: null
        }
    }    
}

export function loadRatesError(error){
    return {
        type: FETCH_CURRENCIES_ERROR,
        payload:{
            rates: {USD: 1},
            isLoading: false,
            error: error
        }
    }
}

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

export const selectBaseCurrency = (code, rates) => {
    return {
        type: CURRENCY_SELECTED,
        payload: {
            code: code,
            baseRate: rates[code]
        }
    }
}

export const selectBaseUnits = (units) => {
    if (units === 'mass') {
        return {
            type: UNITS_SELECTED,
            payload: {
                unitTypes: units,
                definitions: mass().list()
            }
        }
    } else if (units === 'volume') {
        return {
            type: UNITS_SELECTED,
            payload: {
                unitTypes: units,
                definitions: volume().list()
            }
        }
    }
    return []    
}