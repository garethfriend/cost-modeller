import React from 'react'
import { connect } from 'react-redux'
import { 
    getBaseCurrency, 
    getBaseUnit, 
    getIngredientsTotalQuantity, 
    getCollectionPercentOfTotal, 
    getCollectionCostPerBaseUnit 
} from '../redux/selectors'


const Totals = ({ totalQuantity, baseUnit, baseCurrency, fixed, balance, variable }) => {
    const totalCostPerUnit = (variable.costPerBaseUnit * variable.percent) + (balance.costPerBaseUnit * balance.percent) + (fixed.costPerBaseUnit * fixed.percent)
    const totalCost = totalCostPerUnit * totalQuantity
    return (
        <>
            <ul>
                <li>total quantity: {totalQuantity}{baseUnit}</li>    
                {/* <li>fixed cost per {baseUnit}: {fixed.costPerBaseUnit} {baseCurrency}</li>    
                <li>balance cost per {baseUnit}: {balance.costPerBaseUnit} {baseCurrency}`</li>    
                <li>variable cost per {baseUnit}: {variable.costPerBaseUnit} {baseCurrency}`</li>    
                <li>total cost per {baseUnit}: {totalCostPerUnit} {baseCurrency}`</li>     */}
                <li>total cost: {totalCost.toFixed(2)} {baseCurrency}`</li>    
            </ul>
        </>
    )
}

const mapStateToProps = (state) => ({
    totalQuantity: getIngredientsTotalQuantity(state),
    baseUnit: getBaseUnit(state),
    baseCurrency: getBaseCurrency(state),
    fixed: {
        percent: getCollectionPercentOfTotal(state, 'fixed'),
        costPerBaseUnit: getCollectionCostPerBaseUnit(state, 'fixed')
    },
    balance: {
        percent: getCollectionPercentOfTotal(state, 'balance'),
        costPerBaseUnit: getCollectionCostPerBaseUnit(state, 'balance')
    },
    variable: {
        percent: getCollectionPercentOfTotal(state, 'variable'),
        costPerBaseUnit: getCollectionCostPerBaseUnit(state, 'variable')
    }   
})

export default connect(mapStateToProps)(Totals)
