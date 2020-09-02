import {
    combineReducers
} from 'redux'
import currencyReducer, * as fromCurrency from './currency'
import configReducer, * as fromConfig from './config'
import errorsReducer from './error'
import collectionsReducer, * as fromCollections from './collections'
import ingredientReducer from './ingredient'
import {
    createSelector,
    createSelectorCreator,
    defaultMemoize
} from 'reselect'
import { equal } from 'fast-deep-equal'
import { mass, volume } from 'units-converter'



export default combineReducers({
    currency: currencyReducer,
    config: configReducer,
    errors: errorsReducer,
    collections: collectionsReducer,
    ingredients: ingredientReducer
})

// SELECTORS
// memoized selector that maps the unit definitions for the MeasureDropdown component
const getUnitDefinitions = state => fromConfig.getUnitDefinitions(state.config)

// selectors for the base currency and rates
const getRates = state => fromCurrency.getRates(state.currency)
const getBaseCurrency = state => fromConfig.getBaseCurrency(state.config)
const getPriceCurrency = (state, priceCurrency) => priceCurrency

// selector for converting between a price currency and the base currency
const getBaseCurrencyExchangeRate = createSelector(
    getRates, 
    getBaseCurrency, 
    getPriceCurrency,
    (rates, base, price) => {
        return rates[base] / rates[price]
    }
)
// config
const getBaseUnit = state => fromConfig.getBaseUnit(state.config)
const getUnitType = state => fromConfig.getUnitTypes(state.config)

// collections selectors
const getVariableIds = state => fromCollections.getVariableIds(state.collections)
const getFixedIds = state => fromCollections.getFixedIds(state.collections)
const getBalanceIds = state => fromCollections.getBalanceIds(state.collections)

// ingredient selectors
const getIngredients = state => state.ingredients
const getIngredient = (state, id) => state.ingredients.filter(ingredient => ingredient.id === id)

// uses fast-deep-equal instead of default equality checker
const createDeepEqualSelector = createSelectorCreator(defaultMemoize, equal)

const getVariableIngredients = createDeepEqualSelector(
    getIngredients,
    getVariableIds,
    (ingredients, ids) => ingredients.filter(ingredient => ids.includes(ingredient.id))
)

const getFixedIngredients = createDeepEqualSelector(
    getIngredients,
    getFixedIds,
    (ingredients, ids) => ingredients.filter(ingredient => ids.includes(ingredient.id))
)

const getBalanceIngredients = createDeepEqualSelector(
    getIngredients,
    getBalanceIds,
    (ingredients, ids) => ingredients.filter(ingredient => ids.includes(ingredient.id))
)

const normalCostCalc = (ingredients, baseCurrency, baseUnit, rates, unitType) => ingredients.reduce((acc, ingredient) => {
    const exchangeRate = rates[baseCurrency] / rates[ingredient.pricedInCurrency]
    const costPerUnit = (ingredient.cost / ingredient.numberOfUnits) 
    let unitConversionFactor
    if (unitType === 'mass') {
        unitConversionFactor = mass(1).from(ingredient.unit).to(baseUnit).value
    } else {
        unitConversionFactor = volume(1).from(ingredient.unit).to(baseUnit).value
    }
    const normalCostperUnit = costPerUnit * unitConversionFactor * exchangeRate
    return acc + normalCostperUnit
})

const getVariableCollectionCostPerBaseUnit = createDeepEqualSelector(
    getVariableIngredients,
    getBaseCurrency,
    getBaseUnit,
    getRates,
    getUnitType,
    normalCostCalc(ingredients, baseCurrency, baseUnit, rates, unitType)
)

const getFixedCollectionCostPerBaseUnit = createDeepEqualSelector(
    getFixedIngredients,
    getBaseCurrency,
    getBaseUnit,
    getRates,
    getUnitType,
    normalCostCalc(ingredients, baseCurrency, baseUnit, rates, unitType)
)

const getBalanceCollectionCostPerBaseUnit = createDeepEqualSelector(
    getBalanceIngredients,
    getBaseCurrency,
    getBaseUnit,
    getRates,
    getUnitType,
    normalCostCalc(ingredients, baseCurrency, baseUnit, rates, unitType)
)



const getNormalizedIngredientCost = createSelector(
    getIngredient,
    (state, id, )
)

// SELECTORS

 // calculated: (baseCurrencyRate/priceInCurrencyRate)*mass(cost/numberOfUnits).from(unit).to(totalQuantity.baseUnit).value

export {
    getUnitDefinitions,
    getBaseCurrencyExchangeRate,
    getVariableIngredients,
    getFixedIngredients,
    getBalanceIngredients,
    getVariableCollectionCostPerBaseUnit,
    getFixedCollectionCostPerBaseUnit,
    getBalanceCollectionCostPerBaseUnit  
}