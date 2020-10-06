import React from 'react'
import { connect } from 'react-redux'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import IconButton from '@material-ui/core/IconButton'
import SettingsIcon from '@material-ui/icons/Settings'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

import { getBaseCurrency, getBaseUnit } from '../redux/selectors'

const useStyles = makeStyles(theme => ({
    iconButton: {
        padding: 0,
    }
}))


const TopToolBar = props => {
    const { baseUnit, baseCurrency, setOptionsVisible, handleFormOpen } = props

    const classes = useStyles()
    return (
        <Grid item container direction='row' alignItems='flex-start' alignContent='center' spacing={2}>
            <Grid item>
                <Typography variant='body1'>Currency: {baseCurrency}</Typography>
            </Grid>
            <Grid item>
                <Typography variant='body1'>Units: {baseUnit}</Typography>
            </Grid>
            <Grid item >
                <Tooltip title='Project options'>
                    <IconButton className={classes.iconButton} onClick={() => setOptionsVisible(true)} >
                        <SettingsIcon />
                    </IconButton>
                </Tooltip>
            </Grid>
            <Grid item>
                <Tooltip title='Add new ingredient to project'>
                    <IconButton className={classes.iconButton} onClick={() => handleFormOpen(null)}>
                        <AddCircleOutlineIcon />
                    </IconButton>
                </Tooltip>
            </Grid>
        </Grid>          
    )
}

const mapStateToProps = (state) => ({
    baseUnit: getBaseUnit(state),
    baseCurrency: getBaseCurrency(state)
})

export default connect(mapStateToProps)(TopToolBar)
