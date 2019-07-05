import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

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
    skillArray = [];
    componentDidMount() {
        axios.get('/api/chart/skills')
            .then(
                response => {
                    this.skillArray = response.data;
                }
            )
            .catch(error => console.log('error with axios get', error));
    }

    createData = () => {
        let skillNameArray = [];
        let countArray = [];
        this.skillArray.forEach(skill => {
            skillNameArray.push(skill.skill);
            countArray.push(skill.count);
        })
        const data = {
            labels: skillNameArray,
            datasets: [{
                // label: '# of Jobs',
                backgroundColor: ['#71B37C','#ff8a65', '#2ccce4', '#dce775'],
                data: countArray,
            }]
        }
        return data;
    }


    render() {
        return (
            <div>
                
                {/* <pre>
                    {JSON.stringify(this.skillArray)}
                    <br />
                    {JSON.stringify(this.createData())}
                </pre> */}
                <Paper style={styles.paper}>
                <h2>Most Demanding Skills (by # of Jobs)</h2>
                    <Bar
                        data={this.createData}
                        width={10}
                        height={200}
                        options={{
                            maintainAspectRatio: false,
                            scales: {
                                xAxes: [{
                                    barPercentage: 0.4
                                }],
                                yAxes: [{
                                    display: true,
                                    ticks: {
                                        beginAtZero: true,
                                    }
                                }]
                            }
                        }} />
                </Paper>
            </div>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    reduxState,
})
export default connect(mapReduxStateToProps)(DonutChart);