import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import Button from '@material-ui/core/Button'
import debounce from 'lodash.debounce'

import { fetchCurrencies } from '../redux/currency'
import { getErrors, getRates, getLoadingStatus } from '../redux/selectors'


const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

const AlertSnackBar = ({ error, rates, isLoading, fetchCurrencies }) => {

    const [alertOpen, setAlertOpen] = useState(false)
    const [alertType, setAlertType] = useState('')
    const [alertMessage, setAlertMessage] = useState('')

    useEffect(() => {
        if (!isLoading){
            if (error) {
                console.log('error detected')
                setAlertType('error')
                setAlertMessage(`Exchange rates server returned error: "${error}"`)
            } else {
                console.log('success evaluated')
                setAlertType('success')            
                setAlertMessage(`Latest exchange rates successfully received!`)
            }
            setAlertOpen(true)
        }
        console.log('ran useEffect')
    }, [error, rates, isLoading])

    const handleClose = () => {
        setAlertOpen(false)
    }
    
    const handleRetry = debounce(() => {
        setAlertOpen(false)
        fetchCurrencies()
    }, 1000)

    return (
    <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert 
            onClose={handleClose} 
            severity={alertType}
            action={
                alertType === 'error' ? (
                <Button color="inherit" size="small" onClick={handleRetry} >
                  Retry
                </Button>
                ) : null
              } 
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    )
}

const mapStateToProps = state => ({
    rates: getRates(state),
    error: getErrors(state),
    isLoading: getLoadingStatus(state)
})

export default connect(mapStateToProps, { fetchCurrencies })(AlertSnackBar)
