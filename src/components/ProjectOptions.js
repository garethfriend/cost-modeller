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
import { getBaseCurrency, getBaseUnit, getUnitType } from '../redux/selectors'
import { changeBaseCurrency, changeUnitType, changeBaseUnits } from '../redux/config'
import MeasureDropdown from './MeasureDropdown'
import UnitTypeDropdown from './UnitTypeDropdown'

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

const ProjectOptions = (props) => {
    const { baseCurrency, unitType, baseUnit, changeBaseCurrency, changeUnitType, changeBaseUnits, open, handleOptionsClose } = props
    const classes = useStyles()
    return (
        <Drawer anchor='top' open={open} onClose={() => handleOptionsClose(false)}>
            <div className={classes.drawerContainer}>
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
        baseUnit: getBaseUnit(state)
})

export default connect(mapStateToProps, { changeBaseCurrency, changeUnitType, changeBaseUnits })(ProjectOptions)
