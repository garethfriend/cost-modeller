import { FETCH_CURRENCIES_ERROR } from "../actions/types"

const INITIAL_ERROR = null
   
   export function errorsReducer(state = INITIAL_ERROR, action){
    if (action.type === FETCH_CURRENCIES_ERROR) {

        return action.payload.error
    }
        return state;
   }