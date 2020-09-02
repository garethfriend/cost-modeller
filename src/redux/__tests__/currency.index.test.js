import {
    FETCH_CURRENCIES_REQUEST,
    FETCH_CURRENCIES_SUCCESS,
    FETCH_CURRENCIES_ERROR
} from '../types'
import currencyReducer, * as currency from '../currency'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import moxios from 'moxios'
import codes from '../../codes'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('fetchCurrencies actions', () => {
    beforeEach(() => {
        moxios.install()
    })
    
    afterEach(() => {
        moxios.uninstall()
    })
    // TO DO - add some tests for the API
    
    it('creates FETCH_CURRENCIES_SUCCESS action after successfully getting data from API', async (done) => {
        
        const successResponse = {
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
            
            
            // moxios.wait(() => {
                //     let request = moxios.requests.mostRecent()
                //     request.respondWith(successResponse)
                // })

                moxios.stubRequest('https://open.exchangerate-api.com/v6/latest', successResponse)
                
                
        
        const expectedActions = [
            {
                type: FETCH_CURRENCIES_REQUEST,
                payload: {
                    isLoading: true
                }
            },
            {
                type: FETCH_CURRENCIES_SUCCESS,
                payload:{
                    rates: successResponse.rates,
                    isLoading: false,
                    error: null
                }
            }
        ]
        
        const store = mockStore({
            currency: {
                rates: {},
                isLoading: false
            }
        })
        
        await store.dispatch(currency.fetchCurrencies())
        .then(() => {
            console.log(store.getActions())
            
        }) 
        
        
        done()
        
        // expect(store.getActions()).toEqual(expectedActions)
        
        
    })
})

// ACTION CREATORS

