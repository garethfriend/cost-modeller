import React, { useEffect } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid'

import Footer from './Footer'
import AppHeader from './AppHeader'
import HowTo from './HowTo'
import Calculator from './Calculator'
import About from './About'
import CurrencyData from './CurrencyData'
import { fetchCurrencies } from '../redux/currency'
import history from '../history'

const App = ({ fetchCurrencies }) => {

    useEffect(() => {
        fetchCurrencies()
    }, [fetchCurrencies])

    return (
        <Router history={history}>
            <Grid container direction='column' >
                <AppHeader />
                <Grid item>
                    <Switch>
                        <Route path="/" exact component={Calculator} />
                        <Route path="/howto" component={HowTo} />
                        <Route path="/currency" component={CurrencyData} />
                        <Route path="/about" component={About} />
                    </Switch>
                </Grid>
                <Footer />
            </Grid>
        </Router>
    )
}

export default connect(null, { fetchCurrencies })(App)
