import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';


//material ui
import Paper from '@material-ui/core/Paper';
const styles = {
    paper: {
        width: '80%',
        margin: '10px auto',
        padding: '100px',
        paddingTop: '20px',
    },
}

class DonutChart extends Component {
    componentDidMount() {
        this.props.dispatch({
            type: 'FETCH_ALL_JOBS',
        })
    }

    createData = () => {
        let labelArray = [];
        let countArray = [];

        const jobArray = this.props.reduxState.jobList.allJobsReducer;

        for (let i = 0; i < jobArray.length; i++) {
            labelArray.push(jobArray[i].status_name)
            countArray.push(jobArray[i].count);
        }

        const data = {
            labels: labelArray,
            datasets: [{
                data: countArray,
                backgroundColor: [
                    '#FF6384',
                    '#FFCE56',
                    '#36A2EB',
                    '#37d67a',
                    '#ca70d4',
                ],
            }],
            options: {
                plugins: {
                    // Change options for ALL labels of THIS CHART
                    datalabels: {
                        color: '#36A2EB',
                        anchor: 'end',  
                    }
                }
            },
        }
        return data;
    }

    render() {
        return (
            <div>

                {/* <pre>
                    {JSON.stringify(this.props.reduxState.jobList.allJobsReducer, null, 2)}
                </pre> */}
                <Paper style={styles.paper}>
                    <h2>My Job Pipeline</h2>
                    <Doughnut data={this.createData} />
                </Paper>
            </div>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState,
})
export default connect(mapReduxStateToProps)(DonutChart);