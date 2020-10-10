import React from 'react'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

import { getBaseCurrency, getBaseUnit, getCollectionCostPerBaseUnit, getCollectionTotalQuantity } from '../redux/selectors'
import CustomDoughnut from './CustomDoughnut'

const useStyles = makeStyles(theme => ({
    graph: {
        position: 'relative',
        height: '50vh',
        width: '80vw'
    }
}))

const CollectionsChart = ({ quantities, costs, totalQuantity, totalCost, baseUnit, baseCurrency }) => {
    const classes = useStyles()
    return (
        <>
            <Grid item xs={12} md={4} className={classes.graph}>
                <CustomDoughnut 
                    title='Collection Quantities'
                    data={quantities}
                    annotation={`${totalQuantity}${baseUnit}`}
                    tooltips={{
                        callbacks: {
                            title: (tooltipItem, data) => data['labels'][tooltipItem[0]['index']],
                            label: (tooltipItem, data) => `${data['datasets'][0]['data'][tooltipItem['index']]}${baseUnit}`,
                            afterLabel: (tooltipItem, data) => {
                                var dataset = data['datasets'][0]
                                var percent = Math.round((dataset['data'][tooltipItem['index']] / totalQuantity) * 100)
                                return `( ${percent}% )`
                            }
                        }
                    }} 
                />
            </Grid>
            <Grid item xs={12} md={4} className={classes.graph}>
            <CustomDoughnut 
                    title='Collection Costs'
                    data={costs}
                    annotation={`${totalCost}${baseCurrency}`}
                    tooltips={{
                        callbacks: {
                            title: (tooltipItem, data) => data['labels'][tooltipItem[0]['index']],
                            label: (tooltipItem, data) => `${data['datasets'][0]['data'][tooltipItem['index']]}${baseCurrency}`,
                            afterLabel: (tooltipItem, data) => {
                                var dataset = data['datasets'][0]
                                var percent = Math.round((dataset['data'][tooltipItem['index']] / totalCost) * 100)
                                return `( ${percent}% )`
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
    console.log(variableCost, balanceCost, fixedCost)
    return ({
    totalQuantity: (variableQuantity + balanceQuantity + fixedQuantity).toFixed(3),
    totalCost: (variableCost + balanceCost + fixedCost).toFixed(2),
    quantities: [
        variableQuantity.toFixed(3), 
        balanceQuantity.toFixed(3), 
        fixedQuantity.toFixed(3)
    ],
    costs: [
        variableCost.toFixed(2),
        balanceCost.toFixed(2),
        fixedCost.toFixed(2)
    ],
    baseUnit: getBaseUnit(state),
    baseCurrency: getBaseCurrency(state)
})
}

export default connect(mapStateToProps)(CollectionsChart)
