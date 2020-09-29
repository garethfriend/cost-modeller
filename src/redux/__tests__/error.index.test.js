import errorsReducer from '../error'
import { FETCH_CURRENCIES_ERROR, FETCH_CURRENCIES_SUCCESS } from '../types'

it('Handles an action with the type FETCH_CURRENCIES_ERROR ', () => {
    const action = {
        type: FETCH_CURRENCIES_ERROR,
        payload:{
            error: 'error message'
        }
    }
    const newState = errorsReducer(null, action)

    expect(newState).toEqual('error message')
})

it('Handles an unknown action type without error', () => {
    const newState = errorsReducer(null, {type: 'jkafhkjahsf'})

    expect(newState).toEqual(null)
})

it('should replace the existing error with a new error', () => {
    const action = {
        type: FETCH_CURRENCIES_ERROR,
        payload:{
            error: 'error message'
        }
    }
    const newState = errorsReducer('error message 1', action)

    expect(newState).toEqual('error message')
})

it('should clear the error message on action type FETCH_CURRENCIES_SUCCESS', () => {
    const newState = errorsReducer('error message', { type: FETCH_CURRENCIES_SUCCESS })

    expect(newState).toEqual(null)
})