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
const getConfig = state => state.config


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
    [getRates, getBaseCurrency, getPriceCurrency],
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
    [getIngredients, getCollection],
    (ingredients, ids) => ingredients.filter(ingredient => ids.includes(ingredient.id))
)

// COSTING SELECTORS - MAIN APP FUNCTIONALITY

/**
 * Function to calculate the total mass/volume of each collection in base units.
 * @function getCollectionTotalQuantity
 * @param {object} state - redux state object
 * @param {string} collection - name of the collection, 'fixed', 'balance' or 'variable'
 * @returns {number} a total of all ingredient.quantity values in collection in base units.
 */
const getCollectionTotalQuantity = createSelector(
    getCollectionIngredients,
    ingredients => ingredients.reduce((prev, curr) => {
        return prev + curr.quantity
    }, 0)
)

/**
 * Function to calculate the total mass/volume of the entire project.
 * @function getIngredientsTotalQuantity
 * @param {object} state - redux state object
 * @returns {number} a total of all ingredient.quantity values in project in base units.
 */
const getIngredientsTotalQuantity = createSelector(
    getIngredients,
    ingredients => ingredients.reduce((prev, curr) => {
        return prev + curr.quantity
    }, 0)
)

/**
 * Function to calculate the total mass/volume percent of each collection in relation to te project total.
 * @function getCollectionPercentOfTotal
 * @param {object} state - redux state object
 * @param {string} collection - name of the collection, 'fixed', 'balance' or 'variable'
 * @returns {number} a decimal percent between 0 and 1.
 */
const getCollectionPercentOfTotal = createSelector(
    [getCollectionTotalQuantity, getIngredientsTotalQuantity],
    (collectionTotal, ingredientsTotal) => {
        return collectionTotal / ingredientsTotal
    }
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
 * Function to calculate the cost per baseUnit in baseCurrency of the selected collection of ingredients 
 * @function getCollectionCostPerBaseUnit
 * @param {object} state - redux state object
 * @param {string} collection - name of the collection, 'fixed', 'balance' or 'variable'
 * @returns {number} - the cost per baseUnit in baseCurrency
 */
const getCollectionCostPerBaseUnit = createSelector(
    [getCollectionIngredients, getCollectionTotalQuantity, getConfig, getRates],
    (ingredients, totalQuantity, config, rates) => {
        return ingredients.reduce((prev, ingredient) => {
            const costInBaseCurrency = rateConversion(rates, config.baseCurrency, ingredient.pricedInCurrency, ingredient.cost) 
            const costedQuantityInBaseUnits = unitConversion(ingredient.unit, config.baseUnit, ingredient.numberOfUnits, config.unitType)
            const costPerBaseUnit = costInBaseCurrency / costedQuantityInBaseUnits
            const ingredientPercentWeighting = ingredient.quantity / totalQuantity
            return prev + (costPerBaseUnit * ingredientPercentWeighting)
        },0)
    }
    
)

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
    getIngredientsTotalQuantity,
    getCollectionTotalQuantity,
    getCollectionPercentOfTotal,
    getCollectionCostPerBaseUnit
}