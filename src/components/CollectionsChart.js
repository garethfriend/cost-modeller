import React from 'react'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { Doughnut } from 'react-chartjs-2'

import { getCollectionCostPerBaseUnit, getCollectionTotalQuantity } from '../redux/selectors'

const useStyles = makeStyles(theme => ({
    graph: {
        position: 'relative',
        height: '50vh',
        width: '80vw'
    }
}))

const CollectionsChart = ({ data }) => {
    const classes = useStyles()
    console.log('render dougnnut')
    return (
        <Grid item xs={12} md={8} className={classes.graph}>
            <Doughnut 
                data={data}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    title: {
                        display: true,
                        text: 'Collection Quantities'
                    }
                }}
            />
        </Grid>
    )
}

const mapStateToProps = state => {
    const variableQuantity = getCollectionTotalQuantity(state, 'variable')
    const balanceQuantity = getCollectionTotalQuantity(state, 'balance')
    const fixedQuantity = getCollectionTotalQuantity(state, 'fixed')
    const variableCost = variableQuantity * getCollectionCostPerBaseUnit(state, 'variable')
    const balanceCost = balanceQuantity * getCollectionCostPerBaseUnit(state, 'balance')
    const fixedCost = fixedQuantity * getCollectionCostPerBaseUnit(state, 'fixed')
    return ({
    data: {
        labels: [
            'Variable',
            'Balance',
            'Fixed'
        ],
        datasets: [
            {
                label: 'Quantity',
                data: [
                    variableQuantity, 
                    balanceQuantity, 
                    fixedQuantity
                ],
                backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
                ],
                hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
                ]
            },
            {
                label: 'Cost',
                data: [
                    variableCost, 
                    balanceCost, 
                    fixedCost
                ],
                backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
                ],
                hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
                ]
            }
        ]
    }
})
}

export default connect(mapStateToProps)(CollectionsChart)
