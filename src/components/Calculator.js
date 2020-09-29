import React, { useState } from 'react'
import { connect } from 'react-redux'
import Drawer from '@material-ui/core/Drawer'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import SettingsIcon from '@material-ui/icons/Settings'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import ProjectOptions from './ProjectOptions'
import { getBaseCurrency, getBaseUnit } from '../redux/selectors'
import IngredientList from './IngredientList'

const useStyles = makeStyles(theme => ({
    drawerContainer: { 
        padding: theme.spacing(2) 
    },
    container: {
        padding: theme.spacing(2) 
    },
    iconButton: {
        padding: 0
    },
    graph: {
        backgroundColor: 'gray'
    }
}))

const Calculator = props => {
    const { baseUnit, baseCurrency } = props
    const [visible, setVisible] = useState(false)
    const classes = useStyles()
    return (
        <>
            <Drawer anchor='top' open={visible} onClose={() => setVisible(false)}>
                <div className={classes.drawerContainer}>
                    <ProjectOptions />
                    <Tooltip title='Close options panel'>
                        <IconButton onClick={() => setVisible(false)} style={{float: 'right'}}>
                            <CloseIcon />
                        </IconButton>
                    </Tooltip>
                </div>
                    
            </Drawer>
            <Grid container direction='column' className={classes.container}>
                <Grid item container direction='row' alignItems='flex-start' alignContent='center' spacing={3}>
                    <Grid item>
                        <Typography variant='body1'>Currency: {baseCurrency}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant='body1'>Units: {baseUnit}</Typography>
                    </Grid>
                    <Grid item >
                        <Tooltip title='Project options'>
                            <IconButton className={classes.iconButton} onClick={() => setVisible(true)} >
                                <SettingsIcon />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    <Grid item >
                        <Tooltip title='Add new ingredient to project'>
                            <IconButton className={classes.iconButton}>
                                <AddCircleOutlineIcon />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
                <Grid item container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <IngredientList />
                    </Grid>
                    <Grid item xs={12} md={8} className={classes.graph}>
                        graph
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
    // needs an ingredient list
    // needs to display a graph
    // needs to show some controls for the model
    
}

const mapStateToProps = (state) => ({
    baseUnit: getBaseUnit(state),
    baseCurrency: getBaseCurrency(state)
})

export default connect(mapStateToProps)(Calculator)
