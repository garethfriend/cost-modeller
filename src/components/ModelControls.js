import React, { useState } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Slider from '@material-ui/core/Slider'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import { 
    getCollectionCostPerBaseUnit, 
    getCollectionCount, 
    getCollectionPercentOfTotal, 
    getCollectionTotalQuantity, 
    getIngredientsTotalQuantity,
    getModelLimitType,
    getModelLimits 
} from '../redux/selectors'
import { changeModelLimitType, changeModelLimits } from '../redux/model'
import { formatCurrency, roundFloatingPoint } from '../assets/Utils'

const useStyles = makeStyles(theme => ({

}))

const ModelControls = ({ totalQuantity, fixed, balance, variable, modelLimits, modelLimitType, changeModelLimits, changeModelLimitType }) => {
    const classes = useStyles()
    const [tempLimits, setTempLimits] = useState(modelLimits)
    const calculateSliderLimits = () => {
        switch (modelLimitType) {
            case '%tot':
                console.log(modelLimitType)
                return ({
                    min: variable.percent * -100,
                    max: balance.percent * 100,
                })
            case '%col':
                console.log(modelLimitType)
                return ({
                    min: -100,
                    max: (balance.quantity / variable.quantity) * 100,
                })
            case 'unit':
                console.log(modelLimitType)
                return ({
                    min: variable.quantity * -1,
                    max: balance.quantity,
                })
            default:
                console.log(modelLimitType)
                return ({
                    min: 0,
                    max: 0,
                })
        }
    }

    return (
        <Grid item xs={12} md={4}>
            there are {variable.count} variable ingredients
            <RadioGroup row value={modelLimitType} onChange={e => changeModelLimitType(e.target.value)}>
                <FormControlLabel
                    value='%tot'
                    control={<Radio />}
                    label='% of total'
                    labelPlacement='bottom'
                />
                <FormControlLabel
                    value='%col'
                    control={<Radio />}
                    label='% of collection'
                    labelPlacement='bottom'
                />
                <FormControlLabel
                    value='unit'
                    control={<Radio />}
                    label='units'
                    labelPlacement='bottom'
                />
            </RadioGroup>
            <Slider 
                value={tempLimits}
                min={calculateSliderLimits().min}
                max={calculateSliderLimits().max}
                onChange={(e, newValue) => setTempLimits(newValue)}
                onChangeCommitted={e => changeModelLimits(tempLimits)}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                // getAriaValueText={}
            />
        </Grid>
    )
}

const mapStateToProps = state =>({
    modelLimitType: getModelLimitType(state),
    modelLimits: getModelLimits(state),
    totalQuantity: getIngredientsTotalQuantity(state),
    fixed: {
        quantity: getCollectionTotalQuantity(state, 'fixed'),
        percent: getCollectionPercentOfTotal(state, 'fixed'),
        costPerBaseUnit: getCollectionCostPerBaseUnit(state, 'fixed'),
    },
    balance: {
        quantity: getCollectionTotalQuantity(state, 'balance'),
        percent: getCollectionPercentOfTotal(state, 'balance'),
        costPerBaseUnit: getCollectionCostPerBaseUnit(state, 'balance'),
        count: getCollectionCount(state, 'balance')
    },
    variable: {
        quantity: getCollectionTotalQuantity(state, 'variable'),
        percent: getCollectionPercentOfTotal(state, 'variable'),
        costPerBaseUnit: getCollectionCostPerBaseUnit(state, 'variable'),
        count: getCollectionCount(state, 'variable')
    }
})

export default connect(mapStateToProps, { changeModelLimitType, changeModelLimits })(ModelControls)
