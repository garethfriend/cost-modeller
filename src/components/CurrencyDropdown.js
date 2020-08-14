import React from 'react'
import {connect} from 'react-redux'

const CurrencyDropdown = ({rates, selectedCurrency, onChange, className}) => {
    
    const currencyOptions = () => {
        return Object.keys(rates)
            .map(code => <option key={code} value={code}>{code}</option>)
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
