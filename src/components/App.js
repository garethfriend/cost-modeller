import React, { useEffect, useState } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

import Footer from './Footer'
import AppHeader from './AppHeader'
import AlertSnackBar from './AlertSnackBar'
import HowTo from './HowTo'
import Calculator from './Calculator'
import About from './About'
import CurrencyData from './CurrencyData'
import { fetchCurrencies } from '../redux/currency'
import history from '../history'
import { getErrors, getRates } from '../redux/selectors'

const useStyles = makeStyles(theme => ({
    container: {
        minHeight: '100vh'
    },
    content: {
        height: '100%', 
        flexGrow: 1
    }
}))


const App = ({ fetchCurrencies, errors, rates, isLoading }) => {
    const classes = useStyles()
    
    const [alertOpen, setAlertOpen] = useState(false)
    const [alertType, setAlertType] = useState('')
    const [alertMessage, setAlertMessage] = useState('')

    useEffect(() => {
        fetchCurrencies()
    }, [fetchCurrencies])

    useEffect(() => {
        if (!isLoading){
            if (errors) {
                setAlertType('error')
                setAlertMessage(`Exchange rates server returned error: "${errors}"`)
            } else {
                setAlertType('success')            
                setAlertMessage(`Latest exchange rates successfully received!`)
            }
            setAlertOpen(true)
        }
    }, [errors, rates, isLoading])

    const handleClose = () => {
        setAlertOpen(false)
        setAlertType('')
    }    

    return (
        <Router history={history}>
            <Grid container direction='column' justify='flex-start' className={classes.container}>
                <AppHeader />
                <Grid item className={classes.content}>
                    <Switch>
                        <Route path="/" exact component={Calculator} />
                        <Route path="/howto" component={HowTo} />
                        <Route path="/currency" component={CurrencyData} />
                        <Route path="/about" component={About} />
                    </Switch>
                </Grid>
                <Footer />
            </Grid>
            <AlertSnackBar open={alertOpen} severity={alertType} onClose={handleClose} message={alertMessage} />
        </Router>
    )
}

const mapStateToProps = state => ({
    rates: getRates(state),
    errors: getErrors(state)
})

export default connect(mapStateToProps, { fetchCurrencies })(App)
