import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from '../redux/rootReducer'

export const storeFactory = (initialState) => {
    const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
    return createStoreWithMiddleware(rootReducer, initialState)
}


