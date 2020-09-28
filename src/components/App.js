import React, { useEffect } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid'

import Footer from './Footer'
import AppHeader from './AppHeader'
import HowTo from './HowTo'
import Calculator from './Calculator'
import About from './About'
import { fetchCurrencies } from '../redux/currency'
import history from '../history'

const App = ({ fetchCurrencies }) => {

    useEffect(() => {
        fetchCurrencies()
    }, [fetchCurrencies])

    return (
        <Router history={history} >
            <Grid container direction='column' >
                <Grid item>
                    <AppHeader />
                </Grid>
                <Grid item>
                    <Switch>
                        <Route path="/" exact component={Calculator} />
                        <Route path="/howto" component={HowTo} />
                        <Route path="/about" component={About} />
                    </Switch>
                </Grid>
                <Grid item>
                    <Footer />
                </Grid>
            </Grid>
        </Router>
    )
}

export default connect(null, { fetchCurrencies })(App)
