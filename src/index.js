import React from 'react'
import ReactDOM from 'react-dom'
import Root from './Root'

import App from './components/App'
import CssBaseline from "@material-ui/core/CssBaseline";


ReactDOM.render(
    <Root>
        <CssBaseline />
        <App />
    </Root>, 
    document.querySelector('#root')
)