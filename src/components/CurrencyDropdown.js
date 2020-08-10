import React from 'react'

const CurrencyDropdown = ({rates, selectedCurrency, onChange}) => {
    
    const currencyOptions = () => {
        return Object.keys(rates)
            .map(code => <option key={code} value={code}>{code}</option>)
    }    
                    
    return (
        <select 
            onChange={event => onChange(event.target.value, rates)}
            value={selectedCurrency}
        >
            {currencyOptions()}
        </select>

    )
}
    
export default CurrencyDropdown
