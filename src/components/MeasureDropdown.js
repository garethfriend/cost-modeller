import React from 'react'
import { connect } from 'react-redux'

const MeasureDropdown = ({ definitions, selectedUnit, onChange, pluralUnitNames, className }) => {
    
    const measureOptions = definitions.map((measure, index) => {
        
        return(
            <option key={index} value={measure.unit}>
            {measure[pluralUnitNames ? 'plural' : 'singular']}
            </option>
        )
    })
    
    return (
        <select className={className} value={selectedUnit} onChange={event => onChange(event.target.value, definitions)}>
            {measureOptions}
        </select>
    )
}

const mapStateToProps = (state) => ({
    definitions: state.units.definitions
})

export default connect(mapStateToProps)(MeasureDropdown)
