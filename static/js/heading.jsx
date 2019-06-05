"use-strict";
import React from "react";
import '../css/heading.css';

class Heading extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        this.getHeading();
    }   
    
    getHeading() {
        fetch(this.props.heading)
        .then(response => response.json())
        .then(data => {
            this.setState({
                data: data
            })
        });
    }

    render() {
        const heading = this.state.data;
        const size = this.props.size;
        if (size == 'h3') {
            return (
                <div>
                   <h3> {heading} </h3>
                </div>
            ) 
        } else if (size == 'h4') {
            return (
                <div>
                   <h4> {heading} </h4>
                </div>
            )
        } else if (size == 'h1') {
            return (
                <div>
                   <h1> {heading} </h1>
                </div>
            )
        } else if (size == 'h5') {
            return (
                <div>
                   <h5> {heading} </h5>
                </div>
            )
        }
    };
}

export default Heading;