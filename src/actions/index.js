import currency from '../apis/currency'
import { FETCH_CURRENCIES, CURRENCY_SELECTED } from './types'

export const fetchCurrencies = () => async dispatch => {
    const response = await currency.get()
    
    dispatch({ type: FETCH_CURRENCIES, payload: response.data.rates }) 
}

export const selectBaseCurrency = (currency, currencies) => {
    return {
        type: CURRENCY_SELECTED,
        payload: {
            currency: currency,
            baseRate: currencies[currency]
        }
    }
}