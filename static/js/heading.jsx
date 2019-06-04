"use-strict";
import React from "react";

class Heading extends React.Component {

    constructor(props) {
        super(props);
        this.state = {data: []};
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
        console.log('Heading', heading);
        return (
            <div>
               <h1> {heading} </h1>
            </div>
        )
    };
}

export default Heading;