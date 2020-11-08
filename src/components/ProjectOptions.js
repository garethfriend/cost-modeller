import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import CloseIcon from '@material-ui/icons/Close'
import Drawer from '@material-ui/core/Drawer'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'


import CurrencyDropdown from './CurrencyDropdown'
import { getBaseCurrency, getBaseUnit, getCurrencyDecimalPlaces, getPercentageDecimalPlaces, getUnitDecimalPlaces, getUnitType } from '../redux/selectors'
import { 
    changeBaseCurrency, 
    changeUnitType, 
    changeBaseUnits, 
    changeCurrencyDecimalPlaces, 
    changeUnitDecimalPlaces, 
    changePercentageDecimalPlaces 
} from '../redux/config'
import MeasureDropdown from './MeasureDropdown'
import UnitTypeDropdown from './UnitTypeDropdown'
import { TextField } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    buttonFloat: {
        float: 'right'
    },
    drawerContainer: { 
        padding: theme.spacing(2) 
    },
    dropdownContainer: {
        flexGrow: 1
    }
}))

const ProjectOptions = ({ 
                        baseCurrency, 
                        unitType, 
                        baseUnit,
                        unitDecimalPlaces,
                        currencyDecimalPlaces,
                        percentageDecimalPlaces, 
                        changeBaseCurrency, 
                        changeUnitType, 
                        changeBaseUnits, 
                        changeUnitDecimalPlaces, 
                        changeCurrencyDecimalPlaces, 
                        changePercentageDecimalPlaces, 
                        open, 
                        handleOptionsClose }) => {
    const classes = useStyles()
    return (
        <Drawer anchor='top' open={open} onClose={() => handleOptionsClose(false)}>
            <div className={classes.drawerContainer}>
                <Grid item container direction='row' spacing={3} alignItems='center'>
                    <Grid item xs={12}>
                        <Typography variant='h6'>Project Options:</Typography>
                    </Grid>
                    <Grid item className={classes.dropdownContainer} xs={12} md={4}>
                        <CurrencyDropdown
                            id='baseCurrencySelect'
                            label='base currency'
                            value={baseCurrency}
                            onChange={changeBaseCurrency}
                        />
                    </Grid>
                    <Grid item className={classes.dropdownContainer} xs={12} md={4}>
                        <UnitTypeDropdown
                            id='unitTypeSelect'
                            label='unit types'
                            value={unitType}
                            onChange={changeUnitType}
                        />
                    </Grid>
                    <Grid item className={classes.dropdownContainer} xs={12} md={4}>
                        <MeasureDropdown 
                            id='baseUnitSelect'
                            label='base units'
                            value={baseUnit}
                            onChange={changeBaseUnits}
                        />
                    </Grid>
                    <Grid item className={classes.dropdownContainer} xs={12} md={4}>
                        <TextField
                            type='number'
                            variant='outlined'
                            inputProps={{ min: '0', max: '5' }}
                            size='small'
                            fullWidth 
                            label='Decimal places for units of measure'
                            value={unitDecimalPlaces}
                            onChange={e => changeUnitDecimalPlaces(e.target.value)}
                        />
                    </Grid>
                    <Grid item className={classes.dropdownContainer} xs={12} md={4}>
                        <TextField
                            type='number'
                            variant='outlined'
                            inputProps={{ min: '0', max: '5' }}
                            size='small'
                            fullWidth 
                            label='Decimal places for currency'
                            value={currencyDecimalPlaces}
                            onChange={e => changeCurrencyDecimalPlaces(e.target.value)}
                        />
                    </Grid>
                    <Grid item className={classes.dropdownContainer} xs={12} md={4}>
                        <TextField
                            type='number'
                            variant='outlined'
                            inputProps={{ min: '0', max: '5' }}
                            size='small'
                            fullWidth 
                            label='Decimal places for percentages'
                            value={percentageDecimalPlaces}
                            onChange={e => changePercentageDecimalPlaces(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <Tooltip title='Close options panel'>
                    <IconButton onClick={() => handleOptionsClose(false)} className={classes.buttonFloat}>
                        <CloseIcon />
                    </IconButton>
                </Tooltip>
            </div>
        </Drawer>
    )
}

const mapStateToProps = (state) => ({ 
        baseCurrency: getBaseCurrency(state),
        unitType: getUnitType(state),
        baseUnit: getBaseUnit(state),
        unitDecimalPlaces: getUnitDecimalPlaces(state),
        currencyDecimalPlaces: getCurrencyDecimalPlaces(state),
        percentageDecimalPlaces: getPercentageDecimalPlaces(state)
})

export default connect(
    mapStateToProps, 
    { 
        changeBaseCurrency, 
        changeUnitType, 
        changeBaseUnits, 
        changeUnitDecimalPlaces, 
        changeCurrencyDecimalPlaces, 
        changePercentageDecimalPlaces 
    }
    )(ProjectOptions)
