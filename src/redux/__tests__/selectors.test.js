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

describe('getCollectionTotalQuantity', () => {
    const fixedTotal = selectors.getCollectionTotalQuantity(state, 'fixed')
    const balanceTotal = selectors.getCollectionTotalQuantity(state, 'balance')
    const variableTotal = selectors.getCollectionTotalQuantity(state, 'variable')
  it('correctly sums the quantities of the ingredients in that collection', () => {
      expect(fixedTotal).toBe(740)
      expect(balanceTotal).toBe(24.023)
      expect(variableTotal).toBe(0.3)
  })
  it('sum of results for all three collections should equal the project total', () => {
    const expectedQuantity = 764.323
        expect(fixedTotal + balanceTotal + variableTotal).toBe(expectedQuantity)
  })
})

describe('getIngredientsTotalQuantity', () => {
    it('correctly summs the total quantity of all project ingredients', () => {
        const expectedQuantity = 764.323
        const projectTotal = selectors.getIngredientsTotalQuantity(state)
        expect(projectTotal).toBe(expectedQuantity)
    })
})

describe('getCollectionPercentOfTotal', () => {
    const fixedPercent = selectors.getCollectionPercentOfTotal(state, 'fixed')
      const balancePercent = selectors.getCollectionPercentOfTotal(state, 'balance')
      const variablePercent = selectors.getCollectionPercentOfTotal(state, 'variable')
    it('correctly calculates the collection percentages', () => {
      expect(fixedPercent).toBe(0.9681770665019893)
      expect(balancePercent).toBe(0.031430429281861204)
      expect(variablePercent).toBe(0.0003925042161494551)
    })
    it('sum of collection percentages should equal 1', () => {
        expect(fixedPercent + balancePercent + variablePercent).toBe(1)
    })
})

describe('getCollectionCostPerBaseUnit', () => {
    const expectedCost = 0.0002909525993085643
    const cost = selectors.getCollectionCostPerBaseUnit(state, 'fixed')
    expect(cost).toBe(expectedCost)
});