import React, { Component } from 'react'
import Footer from './Footer'
import Header from './Header'
import { Container } from 'semantic-ui-react'

class App extends Component {

   
    render() {
        return (
            <Container>
                <Header size="large"/>
                App  
                <Footer />
            </Container>
        )
    }
}

export default App
