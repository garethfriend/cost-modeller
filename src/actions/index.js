import currency from '../apis/currency'
import { FETCH_CURRENCY } from './types'

export const fetchPosts = () => async dispatch => {
    const response = await currency.get()
    
    dispatch({ type: FETCH_CURRENCY, payload: response.data.rates }) 
}