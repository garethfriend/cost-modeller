import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

import ProjectOptions from './ProjectOptions'
import IngredientList from './IngredientList'
import IngredientForm from './IngredientForm'
import TopToolBar from './TopToolBar'

const useStyles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(2) 
    },
    graph: {
        backgroundColor: 'gray'
    }
}))

const Calculator = props => {
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
            <ProjectOptions open={optionsVisible} handleOptionsClose={setOptionsVisible} />
            <IngredientForm open={formVisible}  id={selectedIngredientId} handleFormClose={setFormVisible} />
            <Grid container direction='column' className={classes.container}>
                <TopToolBar setOptionsVisible={setOptionsVisible} handleFormOpen={handleFormOpen} />
                <Grid item container spacing={2}>
                    <IngredientList handleFormOpen={handleFormOpen} />
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

export default Calculator
