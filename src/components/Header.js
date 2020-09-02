import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { changeBaseCurrency, changeUnitType } from '../redux/config'
import { fetchCurrencies } from '../redux/currency'
import CurrencyDropdown from './CurrencyDropdown'



class Header extends Component {
    componentDidMount() {
        this.props.fetchCurrencies()
        this.props.changeUnitType('mass')
    }
    
    renderDropdowns = () => {
        const {rates, selectedCurrency, changeBaseCurrency, baseRate, changeUnitType, selectedUnits} = this.props
        const renderConversion = selectedCurrency !== 'USD' ? <label className="ui left pointing label">{` ${baseRate} to the USD today.`}</label> : null
        return (
            <Fragment>
                <div className="column">
                    <div className="item ui left labeled input">
                        <label className="ui green label">Base currency: </label>
                        <CurrencyDropdown 
                            className="ui dropdown"
                            rates={rates}
                            selectedCurrency={selectedCurrency}
                            onChange={changeBaseCurrency}
                        />
                    {renderConversion}
                    </div>                 
                </div>
                <div className="column">
                    <div className="item ui left labeled input">
                        <label className="ui blue label">Base measures: </label>
                        <select 
                            className="ui dropdown"
                            onChange={(event) => changeUnitType(event.target.value)} 
                            value={selectedUnits}
                        >
                            <option value="mass" >mass</option>
                            <option value="volume" >volume</option>
                        </select>
                    </div>
                </div>
            </Fragment>
        )
    }

    render() {
        const currencyLoader = () => <div className="ui active small text centered inline loader">Getting exchange rates...</div>

        return (
        <div>
            <div className="search-bar ui segment">
                <form className="ui stackable two column grid">
                    {this.props.isLoading ? currencyLoader() : this.renderDropdowns()}                

                </form>
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
        selectedCurrency: state.config.baseCurrency.code,
        baseRate: state.config.baseCurrency.baseRate,
        selectedUnits: state.units.unitTypes
})


export default connect(mapStateToProps, { fetchCurrencies, changeBaseCurrency, changeUnitType })(Header)