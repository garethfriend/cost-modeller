// SELECTORS
import { createSelector } from 'reselect'
import { mass, volume } from 'units-converter'

import * as fromCurrency from './currency'
import * as fromConfig from './config'
import * as fromIngredient from './ingredient'

// Selectors that need to know about the state slice shape are defined in the same file as the associated reducer and imported here.

// CONFIG RELATED SELECTORS
// memoized selector that maps the unit definitions for the MeasureDropdown component
const getUnitDefinitions = state => fromConfig.getUnitDefinitions(state.config)
const getBaseUnit = state => fromConfig.getBaseUnit(state.config)
const getUnitType = state => fromConfig.getUnitTypes(state.config)
const getBaseCurrency = state => fromConfig.getBaseCurrency(state.config)


// CURRENCY AND CURERNCY CONVERSION SELECTORS
const getRates = state => fromCurrency.getRates(state.currency)
const getPriceCurrency = (_, priceCurrency) => priceCurrency


/**
 * Function for converting between a price currency and the base currency.
 * @function getBaseCurrencyExchangeRate
 * @param {object} state - redux state object
 * @param {string} priceCurrency - the three letter currency code of the currency being converted to base currency.
 * @returns {number} an exchange rate between the two currencies
 */
const getBaseCurrencyExchangeRate = createSelector(
    getRates, 
    getBaseCurrency, 
    getPriceCurrency,
    (rates, base, price) => {
        return rates[base] / rates[price]
    }
)

// COLLECTIONS SELECTORS
/**
 * Function to return the array of ingredient id's for the named collection
 * @function getCollection
 * @param {object} state - redux state object
 * @param {string} collection - name of the collection, 'fixed', 'balance' or 'variable'
 * @returns {array} an array of ingredient ids.
 */
const getCollection = (state, collection) => state.collections[collection]

// INGREDIENT SELECTORS
const getIngredients = state => state.ingredients
const getIngredientById = (state, id) => state.ingredients.filter(ingredient => ingredient.id === id)

// uses fast-deep-equal instead of default equality checker
// const createDeepEqualSelector = createSelectorCreator(defaultMemoize, equal)


/**
 * Function to return all ingredient objects in a collection.
 * @function getCollectionIngredients
 * @param {object} state - redux state object
 * @param {string} collection - name of the collection, 'fixed', 'balance' or 'variable'
 * @returns {array} an array of ingredient objects.
 */
const getCollectionIngredients = createSelector(
    getIngredients,
    getCollection,
    (ingredients, ids) => ingredients.filter(ingredient => ids.includes(ingredient.id))
)

// COSTING SELECTORS - MAIN APP FUNCTIONALITY

// calculate the total mass/volume of each collection in base units - total
const CollectionTotal = (params) => {
    
}



// for a given ingredient calculate its mass/volume fraction for that collection:
// ingredient/total

// for a given ingredient calculate its cost in baseCurrency per baseUnit:
// convert ingredient.cost to baseCurrency - getBaseCurrencyExchangeRate(ingredient.pricedInCurrency) basePrice
// calculate cost per baseUnit - mass(ingredient.numberOfUnits).from(ingredient.unit).to(baseUnits) baseQuantity
// basePrice/baseQuantity

// calculate the collection basePrice per baseUnit:
// (fraction*price) + (fraction*price) + (fraction*price)... = pTotal


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

 // calculated: (baseCurrencyRate/priceInCurrencyRate)*mass(cost/numberOfUnits).from(unit).to(totalQuantity.baseUnit).value

export {
    getUnitDefinitions,
    getBaseCurrencyExchangeRate,
    getCollectionIngredients,  
}