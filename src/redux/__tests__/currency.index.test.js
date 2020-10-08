import moxios from 'moxios'

import {
    FETCH_CURRENCIES_REQUEST,
    FETCH_CURRENCIES_SUCCESS,
    FETCH_CURRENCIES_ERROR
} from '../types'
import currencyReducer, * as currency from '../currency'
import codes from '../../assets/codes'
import {
    storeFactory
} from '../../testUtils'

describe('fetchCurrencies actions', () => {
    beforeEach(() => {
        moxios.install()
    })

    afterEach(() => {
        moxios.uninstall()
    })

    it('updates state correctly after successfully getting data from API', () => {

        const successResponse = {
            status: 200,
            response: {
                result: "success",
                rates: {
                    USD: 1,
                    AED: 3.67,
                    ARS: 64.51,
                    AUD: 1.65,
                    CAD: 1.42,
                    CHF: 0.97,
                    CLP: 864.53,
                    CNY: 7.1,
                    EUR: 0.919,
                    GBP: 0.806
                }
            }
        }
        
        const store = storeFactory({
            currency: {
                rates: {},
                isLoading: false
            }
        })

        moxios.wait(() => {
            let request = moxios.requests.mostRecent()
            request.respondWith(successResponse)
        })

        const expectedState = {
            currency: {
              rates: {
                USD: 1,
                AED: 3.67,
                ARS: 64.51,
                AUD: 1.65,
                CAD: 1.42,
                CHF: 0.97,
                CLP: 864.53,
                CNY: 7.1,
                EUR: 0.919,
                GBP: 0.806
              },
              isLoading: false
            },
            errors: null,
          }



        return store.dispatch(currency.fetchCurrencies())
            .then(() => {
                const newState = store.getState()
                expect(newState.currency).toEqual(expectedState.currency)
                expect(newState.errors).toEqual(expectedState.errors)
            }) 
    })

    it('saves an error piece of state when the currency exchange gives an error', () => {
        const failureResponse = {
            status: 200,
            response: {
                    'result': "error",
                    'error-type': "invalid-key"
            }
        } 
        
        const store = storeFactory({
            currency: {
                rates: {},
                isLoading: false
            }
        })

        moxios.wait(() => {
            let request = moxios.requests.mostRecent()
            request.respondWith(failureResponse)
        })

        const expectedState = {
            currency: {
                rates: {
                    USD: 1,
                    AED: 1,
                    ARS: 1,
                    AUD: 1,
                    BGN: 1,
                    BRL: 1,
                    BSD: 1,
                    CAD: 1,
                    CHF: 1,
                    CLP: 1,
                    CNY: 1,
                    COP: 1,
                    CZK: 1,
                    DKK: 1,
                    DOP: 1,
                    EGP: 1,
                    EUR: 1,
                    FJD: 1,
                    GBP: 1,
                    GTQ: 1,
                    HKD: 1,
                    HRK: 1,
                    HUF: 1,
                    IDR: 1,
                    ILS: 1,
                    INR: 1,
                    ISK: 1,
                    JPY: 1,
                    KRW: 1,
                    KZT: 1,
                    MVR: 1,
                    MXN: 1,
                    MYR: 1,
                    NOK: 1,
                    NZD: 1,
                    PAB: 1,
                    PEN: 1,
                    PHP: 1,
                    PKR: 1,
                    PLN: 1,
                    PYG: 1,
                    RON: 1,
                    RUB: 1,
                    SAR: 1,
                    SEK: 1,
                    SGD: 1,
                    THB: 1,
                    TRY: 1,
                    TWD: 1,
                    UAH: 1,
                    UYU: 1,
                    ZAR: 1
                },
                isLoading: false
            },
            errors: 'invalid-key',
          }

        return store.dispatch(currency.fetchCurrencies())
            .then(() => {
                const newState = store.getState()
                expect(newState.currency).toEqual(expectedState.currency)
                expect(newState.errors).toEqual(expectedState.errors)
            }) 
    })
    
})

// ACTION CREATORS