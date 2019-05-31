"use-strict";
import React, {Component} from "react";
import {Pie} from 'react-chartjs-2';
import '../css/pie.css'
import {TONE_COLORS} from './constants.jsx'


class PieChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {},
            selected_source_tone: null
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

        this.setState({
            selected_source_tone: evt[0]._model.label
        });
        console.log('this.state.selected_source_tone, value:', this.state.selected_source_tone)
        if (this.state.selected_source_tone) {
            fetch(this.props.post_url, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                },
                body: JSON.stringify({
                    selected_source_tone: this.state.selected_source_tone
                })
            })
            .then(() => {
                window.location.reload()
            });
        }
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
            chartData['labels'].push(tone);
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
