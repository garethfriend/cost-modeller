import { FETCH_CURRENCIES_ERROR } from "../types"

// REDUCERS

const INITIAL_ERROR = null
   
const errorsReducer = (state = INITIAL_ERROR, action) => {
    switch (action.type) {
        case FETCH_CURRENCIES_ERROR:
            return action.payload.error
        default:
            return state
        }
}

export default errorsReducer