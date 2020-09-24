import React, { useState } from 'react'
import {connect} from 'react-redux'

import * as selectors from '../redux/selectors'
import ProjectOptions from './ProjectOptions'

const Calculator = () => {
    
    const [visible, setVisible] = useState(false)
    
    
    return (
        <></>
        // <Sidebar.Pushable as={Segment} attached clearing>
        //     <Sidebar
        //         as={Segment}
        //         animation='overlay'
        //         icon='labeled'
        //         onHide={() => setVisible(false)}
        //         direction='top'
        //         visible={visible}
        //     >
        //         <ProjectOptions />
        //     </Sidebar>

        //     <Sidebar.Pusher dimmed={visible} style={{height: '45vh'}}>
        //         <div >
        //             <Button
        //                 floated='right'
        //                 onClick={() => setVisible(true)}
        //             >
        //                 Open Project Options
        //             </Button>
        //         </div>
        //     </Sidebar.Pusher>
        // </Sidebar.Pushable>
    )
    // needs a way of setting project parameters
    // needs an ingredient list
    // needs to display a graph
    // needs to show some controls for the model
    
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps)(Calculator)
