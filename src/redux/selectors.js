// SELECTORS
import { createSelector } from 'reselect'
import {createCachedSelector} from 're-reselect'
import { mass, volume } from 'units-converter'

import * as fromCurrency from './currency'
import * as fromConfig from './config'
import * as fromModel from './model'

// Selectors that need to know about the state slice shape are defined in the same file as the associated reducer and imported here.

// CONFIG RELATED SELECTORS
// memoized selector that maps the unit definitions for the MeasureDropdown component
const getUnitDefinitions = state => fromConfig.getUnitDefinitions(state.config)
const getBaseCurrency = state => fromConfig.getBaseCurrency(state.config)
const getBaseUnit = state => fromConfig.getBaseUnit(state.config)
const getUnitType = state => fromConfig.getUnitType(state.config)
const getConfig = state => state.config

// ERRORS SELECTORS
const getErrors = state => state.errors

// CURRENCY AND CURRENCY CONVERSION SELECTORS
const getRates = state => fromCurrency.getRates(state.currency)
const getLoadingStatus = state => fromCurrency.getLoadingStatus(state.currency)

/**
 * Function for converting between a price currency and the base currency.
 * @function getBaseCurrencyExchangeRate
 * @param {object} state - redux state object
 * @param {string} priceCurrency - the three letter currency code of the currency being converted to base currency.
 * @returns {number} an exchange rate between the two currencies
 */
const getBaseCurrencyExchangeRate = (state, priceCurrency) => {
        return state.currency.rates[state.config.baseCurrency] / state.currency.rates[priceCurrency]
}

// COLLECTIONS SELECTORS
/**
 * Function to return the array of ingredient id's for the named collection
 * @function getCollection
 * @param {object} state - redux state object
 * @param {string} collection - name of the collection, 'fixed', 'balance' or 'variable'
 * @returns {array} an array of ingredient ids.
 */
const getCollection = (state, collection) => state.collections[collection]
const getCollectionCount = (state, collection) => state.collections[collection].length

// INGREDIENT SELECTORS
const getIngredients = state => state.ingredients
const getIngredientCount = state => state.ingredients.length
const getIngredient = (state, id) => state.ingredients.find(ingredient => ingredient.id === id)

const getIngredientCollection = (state, id) => {
    return Object.keys(state.collections).find(collection => state.collections[collection].includes(id))
}

/**
 * Function to return all ingredient objects in a collection.
 * @function getCollectionIngredients
 * @param {object} state - redux state object
 * @param {string} collection - name of the collection, 'fixed', 'balance' or 'variable'
 * @returns {array} an array of ingredient objects.
 */
const getCollectionIngredients = createCachedSelector(
    [getIngredients, getCollection],
    (ingredients, ids) => ingredients.filter(ingredient => ids.includes(ingredient.id))
)(
    (state, collection) => collection
)

// COSTING SELECTORS - MAIN APP FUNCTIONALITY
const totalQuantityCalculation = ingredients => ingredients.reduce((prev, curr) => {
    return prev + curr.quantity
}, 0)

/**
 * Function to calculate the total mass/volume of each collection in base units.
 * @function getCollectionTotalQuantity
 * @param {object} state - redux state object
 * @param {string} collection - name of the collection, 'fixed', 'balance' or 'variable'
 * @returns {number} a total of all ingredient.quantity values in collection in base units.
 */
const getCollectionTotalQuantity = createCachedSelector(
    getCollectionIngredients,
    ingredients => totalQuantityCalculation(ingredients)
)(
    (state, collection) => collection
)

/**
 * Function to calculate the total mass/volume of the entire project.
 * @function getIngredientsTotalQuantity
 * @param {object} state - redux state object
 * @returns {number} a total of all ingredient.quantity values in project in base units.
 */
const getIngredientsTotalQuantity = createSelector(
    getIngredients,
    ingredients => totalQuantityCalculation(ingredients)
)

/**
 * Function to calculate the total mass/volume percent of each collection in relation to te project total.
 * @function getCollectionPercentOfTotal
 * @param {object} state - redux state object
 * @param {string} collection - name of the collection, 'fixed', 'balance' or 'variable'
 * @returns {number} a decimal percent between 0 and 1.
 */
const getCollectionPercentOfTotal = createCachedSelector(
    [getCollectionTotalQuantity, getIngredientsTotalQuantity],
    (collectionTotal, ingredientsTotal) => collectionTotal / ingredientsTotal
)(
    (state, collection) => collection
)

/**
 * Helper function to convert quantities between different units of mass or volume
 * @function unitConversion
 * @param {string} unit - unit to convert from e.g. 'kg' 
 * @param {string} baseUnit - unit to convert to e.g. 'g'
 * @param {number} numberOfUnits - number of units to convert
 * @param {string} unitType - 'mass' or 'volume' conversion
 * @returns {number} 
 */
const unitConversion = (unit, baseUnit, numberOfUnits, unitType) => {
    if (unitType === 'mass') {
        return mass(numberOfUnits).from(unit).to(baseUnit).value
    } else {
        return volume(numberOfUnits).from(unit).to(baseUnit).value
    }
}

/**
 * Helper function to convert prices to desired currency from another
 * @function rateConversion
 * @param {object} rates - key value pairs for currency code and exchange rate to USD 
 * @param {string} baseCode - currency code to convert to
 * @param {string} priceCode - currency code to convert from
 * @param {number} price - ammount to be converted
 * @returns {number}
 */
const rateConversion = (rates, baseCode, priceCode, price) => {
    return rates[baseCode] / rates[priceCode] * price
}

/**
 * Helper function to calculate the cost per unit of a list of ingredients
 * @function costCalculation
 * @param {array} ingredients - array of objects containing the ingredient details
 * @param {number} totalQuantity - the total quantity of the ingredients combined
 * @param {object} config - project configuration: unit types, base units and currency
 * @param {object} rates - currency exchange rates
 * @returns {number} - the cost per unit of the ingredient list provided
 */
const costCalculation = (ingredients, totalQuantity, config, rates) => {
    return ingredients.reduce((prev, ingredient) => {
        const costInBaseCurrency = rateConversion(rates, config.baseCurrency, ingredient.pricedInCurrency, ingredient.cost) 
        const costedQuantityInBaseUnits = unitConversion(ingredient.unit, config.baseUnit, ingredient.numberOfUnits, config.unitType)
        const costPerBaseUnit = costInBaseCurrency / costedQuantityInBaseUnits
        const ingredientPercentWeighting = ingredient.quantity / totalQuantity
        return prev + (costPerBaseUnit * ingredientPercentWeighting)
    }, 0)
}

/**
 * Function to calculate the cost per baseUnit in baseCurrency of the selected collection of ingredients 
 * @function getCollectionCostPerBaseUnit
 * @param {object} state - redux state object
 * @param {string} collection - name of the collection, 'fixed', 'balance' or 'variable'
 * @returns {number} - the cost per baseUnit in baseCurrency
 */
const getCollectionCostPerBaseUnit = createCachedSelector(
    [getCollectionIngredients, getCollectionTotalQuantity, getConfig, getRates],
    (ingredients, totalQuantity, config, rates) => costCalculation(ingredients, totalQuantity, config, rates)
)(
    (state, collection) => collection
)

const getTotalCost = createSelector(
    [getIngredients, getIngredientsTotalQuantity, getConfig, getRates],
    (ingredients, totalQuantity, config, rates) => costCalculation(ingredients, totalQuantity, config, rates)
)

// Model related
const getModelLimitType = state => fromModel.getModelLimitType(state.model)
const getModelLimits = state => fromModel.getModelLimits(state.model)


export {
    getRates,
    getLoadingStatus,
    getUnitDefinitions,
    getBaseUnit,
    getUnitType,
    getErrors,
    getBaseCurrency,
    getBaseCurrencyExchangeRate,
    getCollectionIngredients,
    getCollectionCount,  
    getIngredients,
    getIngredient,
    getIngredientCount,
    getIngredientCollection,
    getIngredientsTotalQuantity,
    getCollectionTotalQuantity,
    getCollectionPercentOfTotal,
    getCollectionCostPerBaseUnit,
    getTotalCost,
    getModelLimitType,
    getModelLimits
}