import React from 'react'
import ReactDOM from 'react-dom'
import Root from './Root'
import 'semantic-ui-css/semantic.min.css'

import App from './components/App'


ReactDOM.render(
    <Root>
        <App />
    </Root>, 
    document.querySelector('#root')
)