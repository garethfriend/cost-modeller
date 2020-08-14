import React from 'react'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import rootReducer from './redux/rootReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default ({ children, initialState={} }) => {
    return (
        <Provider store={createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(thunk)))}>
            {children}
        </Provider>
    )
}