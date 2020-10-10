import React from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import { 
    getBaseCurrency, 
    getBaseUnit, 
    getIngredientsTotalQuantity, 
    getCollectionPercentOfTotal, 
    getCollectionCostPerBaseUnit 
} from '../redux/selectors'

const useStyles = makeStyles(theme => ({
    totals: {
        marginRight: '1em'
    },
    totalsContainer: {
        justifyContent: 'left'
    }
}))

const Totals = ({ totalQuantity, baseUnit, baseCurrency, fixed, balance, variable }) => {
    const classes = useStyles()
    const totalCostPerUnit = (variable.costPerBaseUnit * variable.percent) + (balance.costPerBaseUnit * balance.percent) + (fixed.costPerBaseUnit * fixed.percent)
    const totalCost = totalCostPerUnit * totalQuantity
    return (
        <Grid item container direction='row' className={classes.totalsContainer} xs={12}>
            <Typography className={classes.totals} variant='h6'>Total quantity: {totalQuantity.toFixed(3)}{baseUnit}</Typography>
            <Typography className={classes.totals} variant='h6'>Total cost: {totalCost.toFixed(2)} {baseCurrency}</Typography>
            
            {/* <ul>
                <li></li>    
                {/* <li>fixed cost per {baseUnit}: {fixed.costPerBaseUnit} {baseCurrency}</li>    
                <li>balance cost per {baseUnit}: {balance.costPerBaseUnit} {baseCurrency}`</li>    
                <li>variable cost per {baseUnit}: {variable.costPerBaseUnit} {baseCurrency}`</li>    
                <li>total cost per {baseUnit}: {totalCostPerUnit} {baseCurrency}`</li>     */}
                
        </Grid>
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
