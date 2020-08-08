import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCurrencies, selectBaseCurrency, selectBaseUnits } from '../actions'


class Header extends Component {
    componentDidMount() {
        this.props.fetchCurrencies()
        this.props.selectBaseUnits('mass')
    }

    
    currencyOptions = () => {
        if (!this.props.isLoading) {
            return Object.keys(this.props.rates).map(code => {
                return (
                    <option 
                        key={code}
                        value={code}
                    >
                        {code}
                    </option>)
            })
        }
        return 'loading...'
    }

    render() {
        // console.log(this.props)
        const {rates, selectedCurrency, selectBaseCurrency, baseRate, selectBaseUnits, selectedUnits} = this.props
        const renderConversion = selectedCurrency !== 'USD' ? ` ${baseRate} to the USD today.` : null
        return (
        <div>
            <div>
                Select base currency:
                <select 
                    onChange={(event) => selectBaseCurrency(event.target.value, rates)}
                    value={selectedCurrency}
                >
                    {this.currencyOptions()}
                </select>
                {renderConversion}
            </div>
            <div>
                Select base units of measurement:
                <select 
                    onChange={(event) => selectBaseUnits(event.target.value)} 
                    value={selectedUnits}
                >
                    <option value="mass" >mass</option>
                    <option value="volume" >volume</option>
                </select>
            </div>
            <div className="ui large header">
                <h1>Ingredient Cost Modeller</h1>
                convert units, prices and measures simply to see the effect of changes on ingredient cost.
            </div>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { 
        rates: state.currency.rates,
        isLoading: state.currency.isLoading,
        selectedCurrency: state.currency.baseCurrency.code,
        baseRate: state.currency.baseCurrency.baseRate,
        selectedUnits: state.units.unitTypes
    }
}

export default connect(mapStateToProps, { fetchCurrencies, selectBaseCurrency, selectBaseUnits })(Header)