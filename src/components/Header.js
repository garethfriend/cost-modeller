import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { fetchCurrencies, selectBaseCurrency, selectBaseUnits } from '../actions'
import CurrencyDropdown from './CurrencyDropdown'



class Header extends Component {
    componentDidMount() {
        this.props.fetchCurrencies()
        this.props.selectBaseUnits('mass')
    }
    
    renderDropdowns = () => {
        const {rates, selectedCurrency, selectBaseCurrency, baseRate, selectBaseUnits, selectedUnits} = this.props
        const renderConversion = selectedCurrency !== 'USD' ? ` ${baseRate} to the USD today.` : null
        return (
            <Fragment>
                <div className="field">
                    <span>Select base currency: </span>
                    <CurrencyDropdown 
                        rates={rates}
                        selectedCurrency={selectedCurrency}
                        onChange={selectBaseCurrency}
                    />
                    {renderConversion}
                </div>
                <div className="field">
                    <span>Select base units of measurement: </span>
                    <select 
                        onChange={(event) => selectBaseUnits(event.target.value)} 
                        value={selectedUnits}
                    >
                        <option value="mass" >mass</option>
                        <option value="volume" >volume</option>
                    </select>
                </div>
            </Fragment>
        )
    }

    render() {
        const currencyLoader = () => <div className="ui active small text centered inline loader">Getting exchange rates...</div>

        return (
        <div>
                    
            <div className="ui search-bar segment">
                {this.props.isLoading ? currencyLoader() : this.renderDropdowns()}                
            </div>
            <div className="ui segment">
                <h1>Ingredient Cost Modeller</h1>
                <p>convert units, prices and measures simply to see the effect of changes on ingredient cost.</p>
            </div>
        </div>
        )
    }
}

const mapStateToProps = (state) => ({ 
        rates: state.currency.rates,
        isLoading: state.currency.isLoading,
        selectedCurrency: state.currency.baseCurrency.code,
        baseRate: state.currency.baseCurrency.baseRate,
        selectedUnits: state.units.unitTypes
})


export default connect(mapStateToProps, { fetchCurrencies, selectBaseCurrency, selectBaseUnits })(Header)