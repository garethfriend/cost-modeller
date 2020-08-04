import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCurrencies, selectBaseCurrency } from '../actions'


class Header extends Component {
    componentDidMount() {
        this.props.fetchCurrencies()
    }

    
    currencyOptions = () => {
        return Object.keys(this.props.currencies).map(currency => {
            return (
                <option 
                    key={currency}
                    value={currency}
                >
                    {currency}
                </option>)
        })
    }

    render() {
        const {currencies, selectedCurrency, selectBaseCurrency, baseRate} = this.props
        const renderConversion = selectedCurrency !== 'USD' ? ` ${baseRate} to the USD today.` : null
        return (
        <div>
            <div>
                Select base currency:
                <select 
                    onChange={(event) => selectBaseCurrency(event.target.value, currencies)}
                    value={selectedCurrency}
                >
                    {this.currencyOptions()}
                </select>
                {renderConversion}
            </div>
            <h1>Ingredient Cost Modeller</h1>
            convert units, prices and measures simply to see the effect of changes on ingredient cost.
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { 
        currencies: state.currencies,
        selectedCurrency: state.selectedCurrency.currency,
        baseRate: state.selectedCurrency.baseRate 
    }
}

export default connect(mapStateToProps, { fetchCurrencies, selectBaseCurrency })(Header)