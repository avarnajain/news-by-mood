"use-strict";
import React, {Component} from "react";
import {Polar} from 'react-chartjs-2';

const TONE_COLORS = {
    "sadness": '#76A0A0',
    "fear": '#001514',
    "anger": '#CE0002',
    "joy": '#F6B621',
    "analytical": '#736F72',
    "confident": '#9A8F97',
    "tentative": '#C3BABA'
}

class Bubble extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {},
            filter: null
        }
    }

    componentWillMount() {
        this.getChartData();
    }

    getChartData() {
        this.setState({
            data: this.props.tone_data,
            filter: this.props.filter_type
        })
    }

    render() {
        const propsData = this.state.data;
        // console.log('propsData', propsData);
        const chartData = {
            labels: [],
            datasets: [{
                label: [],
                data: [],
                backgroundColor: []
            }]
        };
        propsData.map((tone) => {
            // console.log('tone', tone)  
            if (tone.type == this.state.filter) {
                chartData['labels'].push(tone.tone);
                chartData['datasets'][0]['label'].push(tone.tone);
                chartData['datasets'][0]['data'].push(tone.score);
                chartData['datasets'][0]['backgroundColor'].push(TONE_COLORS[tone.tone])
            }
        });
        // console.log('chartData', chartData);
        return (
            <div className="pie">
                <Polar
                    borderWidth='1'
                    data={chartData}
                    options={{
                        title: {
                            display: true,
                            text: `${this.state.filter} tones`,
                            fontSize: 15
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

export default Bubble;
