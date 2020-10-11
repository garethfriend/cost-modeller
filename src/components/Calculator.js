import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

import ProjectOptions from './ProjectOptions'
import IngredientList from './IngredientList'
import IngredientForm from './IngredientForm'
import StartScreen from './StartScreen'
import TopToolBar from './TopToolBar'
import { getIngredientCount } from '../redux/selectors'
import CollectionsChart from './CollectionsChart'

const useStyles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(2) 
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

    const classes = useStyles()
    return (
        <>
            <ProjectOptions open={optionsVisible} handleOptionsClose={setOptionsVisible} />
            <IngredientForm open={formVisible}  id={selectedIngredientId} handleFormClose={setFormVisible} />
            <Grid container direction='column' className={classes.container}>
                <TopToolBar setOptionsVisible={setOptionsVisible} handleFormOpen={handleFormOpen} />
                <Grid item container spacing={2}>
                    {ingredientCount > 0 ? (
                        <>
                            <IngredientList handleFormOpen={handleFormOpen} />
                            <CollectionsChart />
                            <Grid item>
                                modelcontrols
                            </Grid>
                            <Grid item>
                                predictions chart
                            </Grid>
                        </>
                    ) : <StartScreen handleFormOpen={handleFormOpen} />}
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
