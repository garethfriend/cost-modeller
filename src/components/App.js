import React, { useEffect } from 'react'
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
    
    useEffect(() => {
        fetchCurrencies()
    }, [fetchCurrencies])

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
            <AlertSnackBar />
        </Router>
    )
}


export default connect(null, { fetchCurrencies })(App)
