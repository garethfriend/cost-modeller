import React, { useState } from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import debounce from 'lodash.debounce'

import codes from '../assets/codes'
import { getRates} from '../redux/selectors'
import { roundFloatingPoint } from '../assets/Utils'
import CurrencyDropdown from './CurrencyDropdown'
import { fetchCurrencies } from '../redux/currency'


const codeDescription = (code) => code in codes? codes[code] : code

const useStyles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(2) 
    }
}))

const CurrencyData = ({ rates, fetchCurrencies, timeStamp }) => {
    const classes = useStyles()
    const [selectedCurrency, setSelectedCurrency] = useState('USD')
    const currencyExchangeRate = (fromCurrency, toCurrency) => {
        return rates[toCurrency] / rates[fromCurrency]
    }
    const currencyOptions = Object.keys(rates)
    .map(code => (
        <p 
            key={code} 
            value={code}
        >
            {`${codeDescription(code)} (${code}) : ${roundFloatingPoint(currencyExchangeRate(code, selectedCurrency), 5)}`}
        </p>
    ))
    
    return (
        <Grid container item xs={12} direction='column' className={classes.container}>
            <h4>Currency Data</h4>
            {`Last updated: ${timeStamp ? timeStamp.replace(/\+\d\d\d\d/, '') : ''}`}
            <Button onClick={debounce(() => fetchCurrencies(), 1000)}>
                Refresh
            </Button>
            <CurrencyDropdown
                id='baseCurrencySelect'
                label='base currency'
                value={selectedCurrency}
                onChange={setSelectedCurrency}
            />
            {currencyOptions}
        </Grid>
    )
}

const mapStateToProps = state => ({
    rates: getRates(state),
    timeStamp: state.currency.timeStamp
})

export default connect(mapStateToProps, { fetchCurrencies })(CurrencyData)
