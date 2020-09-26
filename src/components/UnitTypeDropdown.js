import React from 'react'
import { connect } from 'react-redux'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const UnitTypeDropdown = ({ value, id, label, onChange, className }) => {
    
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
                <MenuItem key={1} value='mass' >Mass</MenuItem>
                <MenuItem key={2} value='volume' >Volume</MenuItem>
            </Select>
        </FormControl>
    )
}

export default UnitTypeDropdown
