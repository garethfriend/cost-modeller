import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

const tabNameToIndex = { 0: '/', 1: '/howto', 2: '/currency', 3: '/about' }
const indexToTabName = { '/': 0, '/howto': 1, '/currency': 2, '/about': 3 }

const AppBarTabs = ({ history, location, menuItems }) => {
    const path = location.pathname
    const [selectedTab, setSelectedTab] = useState(indexToTabName[path])
        
    const handleTabChange = (event, newValue) => {
        if(selectedTab !== newValue) {
            history.push(tabNameToIndex[newValue])
        }
        setSelectedTab(newValue)
    }

    return (
        <>
            <Tabs value={selectedTab} onChange={handleTabChange} >
                {menuItems.map(menuItem => <Tab label={menuItem.menuTitle} key={menuItem.menuTitle}/>)}
            </Tabs>
        </>
    )
}

export default withRouter(AppBarTabs)
