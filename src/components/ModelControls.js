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
    getModelLimits, 
    getBaseUnit
} from '../redux/selectors'
import { changeModelLimitType, changeModelLimits } from '../redux/model'
import { formatCurrency, roundFloatingPoint } from '../assets/Utils'

const useStyles = makeStyles({
    controlBox: {
        textAlign: 'center',
        padding: 0
    },
    rangeSlider: {
        width: '90%',
        margin: '35px auto 10px auto'
    }
})

const ModelControls = ({ totalQuantity, fixed, balance, variable, modelLimits, modelLimitType, changeModelLimits, changeModelLimitType, baseUnits }) => {
    const classes = useStyles()
    const [tempLimits, setTempLimits] = useState(modelLimits)
    
    const calculateSliderLimits = () => {
        switch (modelLimitType) {
            case '%tot':
                return ({
                    min: variable.percent * -100,
                    max: balance.percent * 100,
                })
            case '%col':
                return ({
                    min: -100,
                    max: (balance.quantity / variable.quantity) * 100,
                })
            case 'unit':
                return ({
                    min: variable.quantity * -1,
                    max: balance.quantity,
                })
            default:
                return ({
                    min: 0,
                    max: 0,
                })
        }
    }

    const valueText = (value) => (modelLimitType === '%tot' || modelLimitType === '%col') ? `${value}%` : `${value}${baseUnits}`      

    const marks = [
        {
          value: calculateSliderLimits().min,
          label: `-${valueText(roundFloatingPoint(calculateSliderLimits().min, 2))}`,
        },
        {
          value: 0,
          label: '0',
        },
        {
          value: calculateSliderLimits().max,
          label: `+${valueText(roundFloatingPoint(calculateSliderLimits().max, 2))}`,
        },
      ]
      

    return (
        <Grid item xs={12} md={4} className={classes.controlBox}>
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
                className={classes.rangeSlider}
                value={tempLimits}
                min={calculateSliderLimits().min}
                max={calculateSliderLimits().max}
                onChange={(e, newValue) => setTempLimits(newValue)}
                onChangeCommitted={e => changeModelLimits(tempLimits)}
                valueLabelDisplay='on'
                aria-labelledby='range-slider'
                getAriaValueText={valueText}
                marks={marks}
                step={0.01}
            />
        </Grid>
    )
}

const mapStateToProps = state =>({
    modelLimitType: getModelLimitType(state),
    modelLimits: getModelLimits(state),
    totalQuantity: getIngredientsTotalQuantity(state),
    baseUnits: getBaseUnit(state),
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
