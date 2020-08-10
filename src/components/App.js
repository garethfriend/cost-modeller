import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import Calculator from './Calculator'
import About from './About'
import history from '../history'

const App = () => {
    return (
        <div className="ui container">
            <Router history={history} >
                <div>
                    <Header />
                    <Switch>
                        <Route path="/" exact component={Calculator} />
                        <Route path="/about" exact component={About} />
                    </Switch>
                </div>
            </Router>   
            <Footer />
        </div>
    )
}

export default App
