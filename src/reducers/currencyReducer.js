import { FETCH_CURRENCIES } from '../actions/types'
import { CURRENCY_SELECTED } from '../actions/types'


export const currenciesReducer = (currencies = [], action) => {
    switch (action.type) {
        case FETCH_CURRENCIES:
            return action.payload
        default:
            return currencies
    }
}

const initialCurrency = {
    currency: 'USD',
    baseRate: 1
}

export const selectedCurrencyReducer = (selectedCurrency = initialCurrency, action) => {
    if (action.type === CURRENCY_SELECTED) {
        return action.payload
    }

    return selectedCurrency
}
