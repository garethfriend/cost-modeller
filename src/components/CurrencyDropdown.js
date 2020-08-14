import React from 'react'
import {connect} from 'react-redux'
import codes from '../codes'

const CurrencyDropdown = ({rates, selectedCurrency, onChange, className}) => {
    
    const currencyOptions = () => {
        const codeDescription = (code) => code in codes? codes[code] : code

        return Object.keys(rates)
            .map(code => <option key={code} value={code}>{`${code}: ${codeDescription(code)}`}</option>)
    }    
                    
    return (
        <select 
            className={className}
            onChange={event => onChange(event.target.value, rates)}
            value={selectedCurrency}
        >
            {currencyOptions()}
        </select>

    )
}

const mapStateToProps = (state) => ({
    rates: state.currency.rates
})
    
export default connect(mapStateToProps)(CurrencyDropdown)
