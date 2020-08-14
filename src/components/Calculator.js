import React from 'react'
import {connect} from 'react-redux'
import MeasureDropdown from './MeasureDropdown'
import { totalQuantityUnitsChange, totalQuantityChange } from '../redux/totalQuantity'

const Calculator = (props) => {
    const { totalQuantity, totalQuantityUnits, totalQuantityUnitsChange, totalQuantityChange } = props
    

    return (
        <div className="ui segment">
            <h2>Ingredients</h2>
            <div className="ui three column stackable grid">
                <div className="column">
                    <h3>Subject</h3>
                </div>
                <div className="ui vertical divider"></div>
                <div className="column">
                    <h3>Flex</h3>
                </div>
                <div className="column">
                    <h3>Fixed</h3>
                </div>
            </div>
            <form>
                <div className="">
                    <div className="">Total quantity:</div>
                    <input 
                        className="ui input"
                        type="number"
                        onChange={event => totalQuantityChange(event.target.value)} 
                        value={totalQuantity} 
                    />

                    <MeasureDropdown 
                        className="ui basic select"
                        onChange={totalQuantityUnitsChange} 
                        value={totalQuantityUnits} 
                        pluralUnitNames 
                    />

                </div>
                <br/>
                <button className="ui button primary">Calculate</button>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => ({
    totalQuantity: state.totalQuantity.quantity,
    totalQuantityUnits: state.totalQuantity.unit
})

export default connect(mapStateToProps, { totalQuantityUnitsChange, totalQuantityChange })(Calculator)
