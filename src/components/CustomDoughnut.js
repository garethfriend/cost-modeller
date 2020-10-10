import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import 'chartjs-plugin-annotation'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    relative: {
        position: 'relative',
        width: '100%',
        height: '100%'
    },
    centreText: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center'
    },
    text: {
        // fontSize: '1.5rem'
    }
}))

const CustomDoughnut = ({ data, tooltips, title, annotation }) => {
    const classes = useStyles()
    return (
        <div className={classes.relative}>
            <Doughnut 
                data={{
                    labels: [
                        'Variable',
                        'Balance',
                        'Fixed'
                    ],
                    datasets: [
                        {
                            label: 'Quantity',
                            data: data,
                            backgroundColor: [
                            '#FF6384',
                            '#36A2EB',
                            '#FFCE56'
                            ],
                            hoverBackgroundColor: [
                            '#FF6384',
                            '#36A2EB',
                            '#FFCE56'
                            ]
                        }
                    ]
                }}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    title: {
                        display: true,
                        text: title,
                        padding: 10
                    },
                    layout: {
                        padding: {
                            top: 15,
                            bottom: 15
                        }
                    },
                    legend: {
                        position: 'bottom'
                    },
                    tooltips: tooltips,
                }}
            />
            <div className={classes.centreText}>
                <p className={classes.text}>{annotation}</p>
            </div>
        </div>
    )
}

export default CustomDoughnut
