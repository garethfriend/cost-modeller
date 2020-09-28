import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import { getUnitDefinitions } from '../redux/selectors'

const MeasureDropdown = ({ definitions, value, id, label, onChange, pluralUnitNames, className }) => {
    
    const measureOptions = useMemo(() => definitions.map((measure, index) => {
            return(
                <MenuItem key={index} value={measure.unit}>
                {`${measure[pluralUnitNames ? 'plural' : 'singular']} (${measure.unit})`}
                </MenuItem>
            )
        }),[definitions, pluralUnitNames]) 

    const labelId = `${id}-label`
    
    return (
        <FormControl variant="outlined" className={className} size='small' fullWidth>
            <InputLabel id={labelId}>{label}</InputLabel>
            <Select
            labelId={labelId}
            id={id}
            value={value}
            onChange={event => onChange(event.target.value)}
            label={label}
            >
                {measureOptions}
            </Select>
        </FormControl>
    )
}

const mapStateToProps = (state) => ({
    definitions: getUnitDefinitions(state)
})

export default connect(mapStateToProps)(MeasureDropdown)
