"use-strict";
import React, {Component} from "react";
import {Pie} from 'react-chartjs-2';
import '../css/pie.css'
import {TONE_COLORS} from './constants.jsx'

function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function sumArray(arr) {
    let sum = 0;
    if (arr.length == 0) {
        return sum;
    };
    for (var i = 0; i < arr.length; i++) {
        sum += arr[i]
    };
    return sum;
}

function totalSum(propsData) {
    let sum = 0;
    Object.keys(propsData).forEach((tone) => {
            sum += sumArray(propsData[tone]);
    });
    return sum;
}

class PieChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {},
            selected_pie_tone: null
        }
        this.handleToneSelection = this.handleToneSelection.bind(this)
    }

    componentWillMount() {
        this.getChartData();
    }

    getChartData() {
        this.setState({
            data: this.props.data
        })
    }
    handleToneSelection(evt) {
        // console.log(evt);
        console.log(evt[0]._model.label);
        this.setState({
            selected_pie_tone: evt[0]._model.label
        }, () => {
            console.log('this.state.selected_pie_tone, value:', this.state.selected_pie_tone)
            if (this.state.selected_pie_tone) {
                // console.log('inside fetch', this.state.post_url);
                fetch(this.props.post_url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        selected_pie_tone: this.state.selected_pie_tone
                    })
                })
                .then(() => {
                    window.location.reload()
                });
            }
        });
    }

    render() {
        const heading = this.props.heading;
        const propsData = this.props.data;
        const chartData = {
            labels: [],
            datasets: [{
                label: [],
                data: [],
                backgroundColor: []
            }]
        };
        Object.keys(propsData).forEach((tone) => {
            let value = sumArray(propsData[tone])*100/totalSum(propsData);
            chartData['labels'].push(tone.slice(0,1).toUpperCase() + tone.slice(1) + ' (' + round(value, 1) + '%)');
            chartData['datasets'][0]['label'].push(tone);
            chartData['datasets'][0]['data'].push(propsData[tone].length);
            chartData['datasets'][0]['backgroundColor'].push(TONE_COLORS[tone])
        });
        // console.log('chartData', chartData);
        return (
            <div className="pie">
                <Pie
                    data={chartData}
                    options={{
                        title: {
                            display: true,
                            text: this.props.heading,
                            fontSize: 25
                        },
                        legend: {
                            display: true,
                            position: 'bottom'
                        }
                    }}
                    onElementsClick={this.handleToneSelection} 
                />
            </div>
        )
    }
}

export default PieChart;
