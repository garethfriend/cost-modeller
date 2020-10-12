import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import IconButton from '@material-ui/core/IconButton'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import Tooltip from '@material-ui/core/Tooltip'


const useStyles = makeStyles(theme => ({
    footer: {
        position: 'relative',
        top: 'auto',
        bottom: 0
    },
    homeButton: {
        marginRight: theme.spacing(2)
    },
    link: {
        flexGrow: 1
    }
}))

const Footer = props => {
    const classes = useStyles()

    return (
        <Grid item>
            <AppBar className={classes.footer} color='secondary' >
                <Toolbar variant='dense'>
                    <Link
                        className={classes.link} 
                        href='https://www.exchangerate-api.com' 
                        target='_blank' 
                        rel='noopener noreferrer'
                        color='inherit'
                    >
                        Currency Conversion by ExchangeRate-API.com
                    </Link>
                    <Tooltip title='back to top'>
                        <IconButton className={classes.homeButton} onClick={() => window.scrollTo(0, 0)}>
                            <ArrowUpwardIcon color='inherit' />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>
        </Grid>
    )
}

export default Footer