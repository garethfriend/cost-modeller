import React from 'react'
import {connect} from 'react-redux'
import MeasureDropdown from './MeasureDropdown'
import { totalQuantityUnitsChange, totalQuantityChange } from '../actions/index'

const Calculator = (props) => {
    const {totalQuantity, totalQuantityUnits} = props
    

    return (
        <div>
            Calculator
            <form>
                <label>Input total quantity of product:</label>
                <input onChange={event => props.totalQuantityChange(event.target.value)} value={totalQuantity} />
                <MeasureDropdown 
                    onChange={props.totalQuantityUnitsChange} 
                    value={totalQuantityUnits} 
                    pluralUnitNames 
                />
                <button>Calculate</button>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => ({
    totalQuantity: state.totalQuantity.quantity,
    totalQuantityUnits: state.totalQuantity.unit
})

export default connect(mapStateToProps, { totalQuantityUnitsChange, totalQuantityChange })(Calculator)
