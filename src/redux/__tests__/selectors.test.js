import state from '../mockState'
import * as selectors from '../selectors'

describe('getCurrencyExchangeRate', () => {
  it('should return the correct exchange rate', () => {
      const newState = selectors.getBaseCurrencyExchangeRate(state, 'GBP')
      expect(newState).toBe(1.7322834645669292)
  })
})

describe('getCollectionIngredients', () => {
    it('should return an array of objects from the correct collection', () => {
        const expectedArray = [
            {
                id: '158-2987-3546',
                ingredientName: 'Silicone',
                pricedInCurrency: 'USD',
                cost: 106,
                numberOfUnits: 150,
                unit: 'kg',
                quantity: 24,
                editing: false
            },
            {
                id: '249-3888-8999',
                ingredientName: 'Pigment A',
                pricedInCurrency: 'GBP',
                cost: 100,
                numberOfUnits: 134,
                unit: 'g',
                quantity: 0.023,
                editing: false
            }
        ]
        const ingredients = selectors.getCollectionIngredients(state, 'balance')
        expect(ingredients).toEqual(expectedArray)          
    })
})