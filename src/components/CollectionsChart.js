import React from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

import { 
    getBaseCurrency, 
    getBaseUnit, 
    getCollectionCostPerBaseUnit, 
    getCollectionTotalQuantity,
    getUnitDecimalPlaces,
    getCurrencyDecimalPlaces,
    getPercentageDecimalPlaces 
} from '../redux/selectors'
import CustomDoughnut from './CustomDoughnut'
import { roundFloatingPoint, formatCurrency } from '../assets/Utils'

const useStyles = makeStyles({
    graph: {
        position: 'relative',
        height: '50vh',
        width: '80vw'
    }
})

const CollectionsChart = ({ quantities, costs, totalQuantity, totalCost, baseUnit, baseCurrency, percentageDecimalPlaces }) => {
    const classes = useStyles()
    return (
        <>
            <Grid item xs={12} md={4} className={classes.graph}>
                <CustomDoughnut 
                    title='Quantities'
                    data={quantities}
                    annotation={`${totalQuantity}${baseUnit}`}
                    tooltips={{
                        callbacks: {
                            title: (tooltipItem, data) => data['labels'][tooltipItem[0]['index']],
                            label: (tooltipItem, data) => `${data['datasets'][0]['data'][tooltipItem['index']]}${baseUnit}`,
                            afterLabel: (tooltipItem, data) => {
                                var dataset = data['datasets'][0]
                                var percent = roundFloatingPoint(((dataset['data'][tooltipItem['index']] / totalQuantity) * 100), percentageDecimalPlaces)
                                return `( ${percent}% of total )`
                            }
                        }
                    }} 
                />
            </Grid>
            <Grid item xs={12} md={4} className={classes.graph}>
            <CustomDoughnut 
                    title='Costs'
                    data={costs}
                    annotation={`${formatCurrency(totalCost, baseCurrency)}`}
                    tooltips={{
                        callbacks: {
                            title: (tooltipItem, data) => data['labels'][tooltipItem[0]['index']],
                            label: (tooltipItem, data) => `${formatCurrency(data['datasets'][0]['data'][tooltipItem['index']], baseCurrency)}`,
                            afterLabel: (tooltipItem, data) => {
                                var dataset = data['datasets'][0]
                                var percent = roundFloatingPoint(((dataset['data'][tooltipItem['index']] / totalCost) * 100), percentageDecimalPlaces)
                                return `( ${percent}% of total )`
                            }
                        }
                    }} 
                />
            </Grid>
        </>
    )
}

const mapStateToProps = state => {
    const variableQuantity = getCollectionTotalQuantity(state, 'variable')
    const balanceQuantity = getCollectionTotalQuantity(state, 'balance')
    const fixedQuantity = getCollectionTotalQuantity(state, 'fixed')
    const variableCost = variableQuantity * getCollectionCostPerBaseUnit(state, 'variable')
    const balanceCost = balanceQuantity * getCollectionCostPerBaseUnit(state, 'balance')
    const fixedCost = fixedQuantity * getCollectionCostPerBaseUnit(state, 'fixed')
    const unitDecimalPlaces = getUnitDecimalPlaces(state)
    const currencyDecimalPlaces = getCurrencyDecimalPlaces(state)
    

    return ({
    totalQuantity: roundFloatingPoint((variableQuantity + balanceQuantity + fixedQuantity), unitDecimalPlaces),
    totalCost: roundFloatingPoint((variableCost + balanceCost + fixedCost), currencyDecimalPlaces),
    quantities: [
        roundFloatingPoint(variableQuantity, unitDecimalPlaces), 
        roundFloatingPoint(balanceQuantity, unitDecimalPlaces), 
        roundFloatingPoint(fixedQuantity, unitDecimalPlaces)
    ],
    costs: [
        roundFloatingPoint(variableCost, currencyDecimalPlaces),
        roundFloatingPoint(balanceCost, currencyDecimalPlaces),
        roundFloatingPoint(fixedCost, currencyDecimalPlaces) 
    ],
    baseUnit: getBaseUnit(state),
    baseCurrency: getBaseCurrency(state),
    percentageDecimalPlaces: getPercentageDecimalPlaces(state)
})
}

export default connect(mapStateToProps)(CollectionsChart)
