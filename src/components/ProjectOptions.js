import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import CurrencyDropdown from './CurrencyDropdown'
import { getBaseCurrency, getBaseUnit, getUnitType } from '../redux/selectors'
import { changeBaseCurrency, changeUnitType, changeBaseUnits } from '../redux/config'
import MeasureDropdown from './MeasureDropdown'
import UnitTypeDropdown from './UnitTypeDropdown'

const useStyles = makeStyles(theme => ({
    dropdownContainer: {
        flexGrow: 1
    }
}))

const ProjectOptions = (props) => {
    const { baseCurrency, unitType, baseUnit, changeBaseCurrency, changeUnitType, changeBaseUnits } = props
    const classes = useStyles()
    return (
        <Grid item container direction='row' spacing={3} alignItems='center'>
            <Grid item>
                <Typography variant='h6'>Project Options:</Typography>
            </Grid>
            <Grid item className={classes.dropdownContainer} xs={12} md='auto'>
                <CurrencyDropdown
                    id='baseCurrencySelect'
                    label='base currency'
                    value={baseCurrency}
                    onChange={changeBaseCurrency}
                />
            </Grid>
            <Grid item className={classes.dropdownContainer} xs={12} md='auto'>
                <UnitTypeDropdown
                    id='unitTypeSelect'
                    label='unit types'
                    value={unitType}
                    onChange={changeUnitType}
                />
            </Grid>
            <Grid item className={classes.dropdownContainer} xs={12} md='auto'>
                <MeasureDropdown 
                    id='baseUnitSelect'
                    label='base units'
                    value={baseUnit}
                    onChange={changeBaseUnits}
                />
            </Grid>
        </Grid>
    )
}

const mapStateToProps = (state) => ({ 
        baseCurrency: getBaseCurrency(state),
        unitType: getUnitType(state),
        baseUnit: getBaseUnit(state)
})

export default connect(mapStateToProps, { changeBaseCurrency, changeUnitType, changeBaseUnits })(ProjectOptions)
