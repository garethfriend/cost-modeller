import { FETCH_CURRENCIES_ERROR } from "../types"

// REDUCERS

const INITIAL_ERROR = null
   
export const errorsReducer = (state = INITIAL_ERROR, action) => {
    if (action.type === FETCH_CURRENCIES_ERROR) {

        return action.payload.error
    }
        return state;
}
