import React, { useState } from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import Drawer from '@material-ui/core/Drawer'


import ProjectOptions from './ProjectOptions'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

const Calculator = () => {
    
    const [visible, setVisible] = useState(false)
    
    return (
        <>
            <Drawer anchor='top' open={visible} onClose={() => setVisible(false)}>
                <div style={{padding: '15px'}}>
                    <ProjectOptions />
                    <IconButton onClick={() => setVisible(false)} style={{float: 'right'}}>
                        <CloseIcon />
                    </IconButton>
                </div>
                    
            </Drawer>
            <Grid container direction='column'>
                <Grid item>
                    <Button onClick={() => setVisible(true)} >project options</Button>

                </Grid>
            </Grid>
        </>
    )
    // needs an ingredient list
    // needs to display a graph
    // needs to show some controls for the model
    
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps)(Calculator)
