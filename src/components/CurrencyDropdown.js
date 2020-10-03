import React from 'react'
import {connect} from 'react-redux'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import codes from '../codes'
import { getRates } from '../redux/selectors'

const codeDescription = (code) => code in codes? codes[code] : code

const CurrencyDropdown = ({rates, id, label, value, onChange, className}) => {
    
    const currencyOptions = Object.keys(rates)
            .map(code => <MenuItem key={code} value={code}>{`${codeDescription(code)} (${code})`}</MenuItem>)

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
                {currencyOptions}
            </Select>
        </FormControl>
    )
}

const mapStateToProps = (state) => ({
    rates: getRates(state),
})
    
export default connect(mapStateToProps)(CurrencyDropdown)
