import React, { useState } from 'react'
import { connect } from 'react-redux'

import codes from '../assets/codes'
import { getRates} from '../redux/selectors'
import { roundFloatingPoint } from '../assets/Utils'
import CurrencyDropdown from './CurrencyDropdown'


const codeDescription = (code) => code in codes? codes[code] : code

const CurrencyData = ({ rates }) => {
    const [selectedCurrency, setSelectedCurrency] = useState('USD')
    const currencyExchangeRate = (fromCurrency, toCurrency) => {
        return rates[toCurrency] / rates[fromCurrency]
    }
    const currencyOptions = Object.keys(rates)
    .map(code => (
        <p 
            key={code} 
            value={code}
        >
            {`${codeDescription(code)} (${code}) : ${roundFloatingPoint(currencyExchangeRate(code, selectedCurrency), 5)}`}
        </p>
    ))
    
    return (
        <div>
            <h4>Currency Data</h4>
            <CurrencyDropdown
                id='baseCurrencySelect'
                label='base currency'
                value={selectedCurrency}
                onChange={setSelectedCurrency}
            />
            {currencyOptions}
        </div>
    )
}

const mapStateToProps = state => ({
    rates: getRates(state)
})

export default connect(mapStateToProps)(CurrencyData)
