import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import { ReactComponent as StartLogo } from '../assets/chemistry.svg'

import ProjectOptions from './ProjectOptions'
import IngredientList from './IngredientList'
import IngredientForm from './IngredientForm'
import TopToolBar from './TopToolBar'
import { getIngredientCount } from '../redux/selectors'
import Totals from './Totals'

const useStyles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(2) 
    },
    graph: {
        backgroundColor: 'gray'
    },
    centerContent: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    centeredItem: {
        margin: 'auto',
        marginTop: '50px'
    }
}))

const Calculator = ({ ingredientCount }) => {
    const [optionsVisible, setOptionsVisible] = useState(false)
    const [formVisible, setFormVisible] = useState(false)
    const [selectedIngredientId, setSelectedIngredientId] = useState(null)

    const handleFormOpen = (id=null) => {
        setSelectedIngredientId(id)
        setFormVisible(true)
    }

    const renderListOrStart = () => {
        return ingredientCount > 0 ? (
            <>
                <Totals />
                <IngredientList handleFormOpen={handleFormOpen} />
                <Grid item xs={12} md={8} className={classes.graph}>
                    graph
                </Grid>
                <Grid item>
                </Grid>
            </>
        ) : (
            <>
                <Grid item xs={12} className={classes.centerContent}>
                    <StartLogo className={classes.centeredItem}/>
                </Grid>
                <Grid item xs={12} className={classes.centerContent}>
                    <Button 
                        variant='contained' 
                        color='primary' 
                        className={classes.centeredItem} 
                        onClick={() => handleFormOpen()} 
                    >
                        Get Started
                    </Button>
                </Grid>
            </>
        )
}

    const classes = useStyles()
    return (
        <>
            <ProjectOptions open={optionsVisible} handleOptionsClose={setOptionsVisible} />
            <IngredientForm open={formVisible}  id={selectedIngredientId} handleFormClose={setFormVisible} />
            <Grid container direction='column' className={classes.container}>
                <TopToolBar setOptionsVisible={setOptionsVisible} handleFormOpen={handleFormOpen} />
                <Grid item container spacing={2}>
                    {renderListOrStart()}
                </Grid>
            </Grid>
        </>
    )
    // needs to display a graph
    // needs to show some controls for the model
    
}

const mapStateToProps = (state) => ({
    ingredientCount: getIngredientCount(state)
})

export default connect(mapStateToProps)(Calculator)
