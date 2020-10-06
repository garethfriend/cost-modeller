import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import AppBarMenu from './AppBarMenu'
import AppBarTabs from './AppBarTabs'

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1
    },
    title: {
        [theme.breakpoints.down('sm')]: {
            flexGrow: 1
        },
        marginRight: theme.spacing(2)
    }
}))

const menuItems = [
    { menuTitle: 'Calculator', pageURL: '/' },
    { menuTitle: 'How To', pageURL: '/howto' },
    { menuTitle: 'About', pageURL: '/about' }
]

const AppHeader = () => {
    const classes = useStyles()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
     
    return (
      <Grid item className={classes.root}>
         <AppBar position='static'>
            <Toolbar>
              <Typography variant='h5' className={classes.title}>
                Ingredient Cost Modeller
              </Typography>
              {isMobile ? <AppBarMenu menuItems={menuItems} /> : <AppBarTabs menuItems={menuItems} />}
            </Toolbar>
          </AppBar>
      </Grid>
    )
}

export default AppHeader
