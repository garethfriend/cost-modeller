import { combineReducers } from 'redux'
import currencyReducer, * as fromCurrency from './currency'
import configReducer, * as fromConfig  from './config'
import errorsReducer from './error'
import collectionsReducer from './collections'
import { ingredientReducer } from './ingredient'
import { createSelector } from 'reselect'


export default combineReducers({
    currency: currencyReducer,
    config: configReducer,
    errors: errorsReducer,
    collections: collectionsReducer,
    ingredients: ingredientReducer
})

// SELECTORS

// memoized selector that maps the unit definitions for the MeasureDropdown component
export const getUnitDefinitions = state => fromConfig.getUnitDefinitions(state.config)

// selectors for the base currency and rates
const getRates = state => fromCurrency.getRates(state.currency)
const getBaseCurrency = state => fromConfig.getBaseCurrency(state.config)
const getPriceCurrency = (state, priceCurrency) => priceCurrency

// selector for converting between a price currency and the base currency
export const getBaseCurrencyExchangeRate = createSelector(
    [getRates, getBaseCurrency, getPriceCurrency],
    (rates, base, price) => {
        return rates[base] / rates[price]
    }
)