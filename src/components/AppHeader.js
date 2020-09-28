import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
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

const tabNameToIndex = { 0: '/', 1: '/howto', 2: '/about' }
const indexToTabName = { '/': 0, '/howto': 1, '/about': 2 }

const AppHeader = props => {
    const { location, history } = props
    const path = location.pathname
    
    const [anchorEl, setAnchorEl] = useState(null)
    const [selectedTab, setSelectedTab] = useState(indexToTabName[path])
    
    const classes = useStyles()
    const theme = useTheme()
    const open = Boolean(anchorEl)
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    
    const handleMenu = event => {
        setAnchorEl(event.currentTarget)
    }
    
    const handleMenuClick = pageURL => {
        history.push(pageURL)
        setAnchorEl(null)
    }
        
    const handleTabChange = (event, newValue) => {
        history.push(tabNameToIndex[newValue])
        setSelectedTab(newValue)
    }

    return (
        <div className={classes.root}>
          <AppBar position='static'>
            <Toolbar>
              <Typography variant='h5' className={classes.title}>
                Ingredient Cost Modeller
              </Typography>
              {isMobile ? (
                <>
                  <IconButton
                    edge='start'
                    className={classes.menuButton}
                    color='inherit'
                    onClick={handleMenu}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id='menu-appbar'
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    open={open}
                    onClose={() => setAnchorEl(null)}
                  >
                    {menuItems.map(menuItem => {
                      const { menuTitle, pageURL } = menuItem
                      return (
                        <MenuItem onClick={() => handleMenuClick(pageURL)} key={menuTitle}>
                          {menuTitle}
                        </MenuItem>
                      )
                    })}
                  </Menu>
                </>
              ) : (
                <>
                    <Tabs value={selectedTab} onChange={handleTabChange} >
                        {menuItems.map(menuItem => <Tab label={menuItem.menuTitle} key={menuItem.menuTitle}/>)}
                    </Tabs>
                </>
              )}
            </Toolbar>
          </AppBar>
        </div>
    )
}

export default withRouter(AppHeader)
