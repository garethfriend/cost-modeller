import React from 'react'
import { connect } from 'react-redux'
import CurrencyDropdown from './CurrencyDropdown'
import MeasureDropdown from './MeasureDropdown'

const Ingredient = ({ key, ingredientName, pricedInCurrency, cost, unit, numberOfUnits, editing, normalizedCost, baseUnits, baseCurrency }) => {
    if (editing) {
        return (
            <div key={key} className="item">
                <i className="flask icon" />
                <div className="ui left labeled input">
                    <label className="ui label label">Ingredient name:</label>
                    <input className="ui input" value={ingredientName} type="text" />
                </div>
                <div className="ui left labeled input">
                    <label className="ui label label">Cost:</label>
                    <input className="ui input" value={cost} type="text" />
                    <CurrencyDropdown className="ui select" value={pricedInCurrency} />
                    /
                    <input className="ui input" value={numberOfUnits} />
                    <MeasureDropdown className="ui select" value={unit} pluralUnitNames />
    
                </div>
            </div>
        )
    }

    return (
        <div key={key} className="item">
            <i className="flask icon" />
            <h3>{ingredientName}</h3>
            <meta>{`${baseCurrency}${normalizedCost} per ${baseUnits}`}</meta>
        </div>
    )
    
}

const mapStateToProps = (state) => ({
    key: state.ingredient.id,
    container: state.ingredient.id.container,
    ingredientName: state.ingredient.id.ingredientName,
    pricedInCurrency: state.ingredient.id.pricedInCurrency,
    cost: state.ingredient.id.cost,
    unit: state.ingredient.id.unit,
    numberOfUnits: state.ingredient.id.numberOfUnits,
    normalizedCost: state.ingredient.id.normalizedCost,
    normalizedUnit: state.ingredient.id.normalizedUnit,
    editing: state.ingredient.id.editing,
    baseCurrency: state.currency.baseCurrency,
    baseUnits: state.totalQuantity.unit
})

export default connect(mapStateToProps)(Ingredient)
