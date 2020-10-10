import React from 'react'
import { ReactComponent as StartLogo } from '../assets/chemistry.svg'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
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

const StartScreen = ({ handleFormOpen }) => {
    const classes = useStyles()
    return (
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

export default StartScreen
