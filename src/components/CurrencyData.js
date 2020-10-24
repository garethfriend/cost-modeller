import React, { useState } from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import debounce from 'lodash.debounce'

import codes from '../assets/codes'
import { getRates} from '../redux/selectors'
import { roundFloatingPoint, formatCurrency } from '../assets/Utils'
import CurrencyDropdown from './CurrencyDropdown'
import { fetchCurrencies } from '../redux/currency'

const useStyles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(2) 
    },
    controls: {
        margin: '10px auto'
    },
    table: {
        maxWidth: 650,
    },
}))

const codeDescription = (code) => code in codes? codes[code] : code

const createData = (name, code, rate) => {
    return { name, code, rate };
}

const CurrencyData = ({ rates, fetchCurrencies, timeStamp }) => {
    const classes = useStyles()
    const [selectedCurrency, setSelectedCurrency] = useState('USD')
    const currencyExchangeRate = (fromCurrency, toCurrency) => {
        return rates[toCurrency] / rates[fromCurrency]
    }
      
    const rows = Object.keys(rates).map(code => {
        return createData(codeDescription(code), code, roundFloatingPoint(currencyExchangeRate(code, selectedCurrency), 4))
    })

    return (
        <Grid container item xs={12} direction='column' className={classes.container}>
            <Typography variant='h6'>Today's currency exchange rates:</Typography>
            <Typography variant='subtitle2'>{`Last updated: ${timeStamp ? timeStamp.replace(/\+\d\d\d\d/, '') : ''}`}</Typography>
            <Grid 
                item 
                container 
                xs={12} 
                direction='row' 
                alignItems='center'
                spacing={2} 
                className={classes.controls}
            >
                <Grid item xs={4} sm={3} md={2} lg={1}>
                    <Button 
                        fullWidth
                        variant='outlined'
                        color='primary'
                        onClick={debounce(() => fetchCurrencies(), 1000)}
                    >
                        Refresh
                    </Button>
                </Grid>
                <Grid item xs={8} sm={7} md={5} lg={4}>
                    <CurrencyDropdown
                        id='baseCurrencySelect'
                        label='Base currency'
                        value={selectedCurrency}
                        onChange={setSelectedCurrency}
                    />
                </Grid>
            </Grid>
            <Grid item xs={12}>

                <TableContainer className={classes.table} component={Paper}>
                    <Table 
                        aria-label='currency exchange rates'
                        size='small'
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell >Currency</TableCell>
                                <TableCell align='right' padding='none'>ISO&nbsp;code</TableCell>
                                <TableCell align='right'>{`Buys ${formatCurrency(0, selectedCurrency)}`}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component='th' scope='row' >
                                    {row.name}
                                </TableCell>
                                <TableCell align='right' padding='none'>{row.code}</TableCell>
                                <TableCell align='right'>{row.rate}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = state => ({
    rates: getRates(state),
    timeStamp: state.currency.timeStamp
})

export default connect(mapStateToProps, { fetchCurrencies })(CurrencyData)
