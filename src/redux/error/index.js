import { FETCH_CURRENCIES_ERROR, FETCH_CURRENCIES_SUCCESS } from "../types"

// REDUCERS

const INITIAL_ERROR = null
   
const errorsReducer = (state = INITIAL_ERROR, action) => {
    switch (action.type) {
        case FETCH_CURRENCIES_ERROR:
            return action.payload.error
        case FETCH_CURRENCIES_SUCCESS:
            return null
        default:
            return state
        }
}

export default errorsReducer