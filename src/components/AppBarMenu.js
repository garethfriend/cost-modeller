import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    menuButton: {
      marginRight: theme.spacing(2)
    }
}))


const AppBarMenu = ({ menuItems, history, location }) => {
    const path = location.pathname
    
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = useState(null)
    
    const handleMenu = event => {
        setAnchorEl(event.currentTarget)
    }
    
    const handleMenuClick = pageURL => {
        if (path !== pageURL) {
            history.push(pageURL)
        }    
        setAnchorEl(null)
    }

    return (
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
            open={Boolean(anchorEl)}
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
    )
}

export default withRouter(AppBarMenu)
