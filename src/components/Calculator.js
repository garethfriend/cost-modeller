import React, { useState } from 'react'
import { connect } from 'react-redux'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import CloseIcon from '@material-ui/icons/Close'
import Dialog from '@material-ui/core/Dialog'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import SettingsIcon from '@material-ui/icons/Settings'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import ProjectOptions from './ProjectOptions'
import { getBaseCurrency, getBaseUnit } from '../redux/selectors'
import IngredientList from './IngredientList'
import IngredientForm from './IngredientForm'

const useStyles = makeStyles(theme => ({
    dialogContainer: {
        padding: theme.spacing(2)
    },
    drawerContainer: { 
        padding: theme.spacing(2) 
    },
    container: {
        padding: theme.spacing(2) 
    },
    iconButton: {
        padding: 0,
    },
    graph: {
        backgroundColor: 'gray'
    },
    list: {
        flexGrow: 1,
        padding: theme.spacing(1), 
        maxWidth: '400px'
    },
    topDivider: {
        marginTop: theme.spacing(1)
    }
}))

const Calculator = props => {
    const { baseUnit, baseCurrency } = props
    const [optionsVisible, setOptionsVisible] = useState(false)
    const [formVisible, setFormVisible] = useState(false)
    const [selectedIngredientId, setSelectedIngredientId] = useState(null)

    const handleFormOpen = (id) => {
        setSelectedIngredientId(id)
        setFormVisible(true)
    }

    const classes = useStyles()
    return (
        <>
            <Drawer anchor='top' open={optionsVisible} onClose={() => setOptionsVisible(false)}>
                <div className={classes.drawerContainer}>
                    <ProjectOptions />
                    <Tooltip title='Close options panel'>
                        <IconButton onClick={() => setOptionsVisible(false)} style={{float: 'right'}}>
                            <CloseIcon />
                        </IconButton>
                    </Tooltip>
                </div>
                    
            </Drawer>
            <Dialog open={formVisible} onClose={() => setFormVisible(false)}>
                <div className={classes.dialogContainer}>
                    <IngredientForm id={selectedIngredientId} closeCallback={setFormVisible} />
                </div>
            </Dialog>
            <Grid container direction='column' className={classes.container}>
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
                <Grid item container spacing={2}>
                    <Grid item xs={12} md={4} className={classes.list}>
                        <Divider className={classes.topDivider}/>
                        <IngredientList editCallback={handleFormOpen} />
                    </Grid>
                    <Grid item xs={12} md={8} className={classes.graph}>
                        graph
                    </Grid>
                    <Grid item>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
    // needs to display a graph
    // needs to show some controls for the model
    
}

const mapStateToProps = (state) => ({
    baseUnit: getBaseUnit(state),
    baseCurrency: getBaseCurrency(state)
})

export default connect(mapStateToProps)(Calculator)
