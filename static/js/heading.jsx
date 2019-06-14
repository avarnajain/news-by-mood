"use-strict";
import React from "react";
import '../css/heading.css';
import {TONE_COLORS} from './constants.jsx'
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
        const filter = this.props.filter;
        if (filter == 'tone-filter' || filter == 'category-filter') {
            // console.log(heading, 'heading')
            if (heading) {
                    return (
                    <div style={{color:'grey'}}>
                        <h5> Filtered by {heading} </h5>
                    </div>
                )
            } else {
                return (
                    <div>
                    </div>
                )
            } 
        } else if (size == 'h3' && (filter == 'emotion' || filter == 'language')) {
            return (
                <div id="heading">
                    <h3 id="heading-tone" 
                        style={{color:'black'}}>
                        All articles with the tone {heading}
                    </h3>
                </div>
            )
        } else if (size == 'h3' && filter == 'category-all-articles') {
            return (
                <div id="heading">
                    <h3 id="heading-category" 
                        style={{color:'black'}}>
                        All articles within the {heading} category
                    </h3>
                </div>
            )
        } else if (size == 'h1' && filter == 'category') {
            return (
                <div id="heading">
                   <h1>{heading}</h1>
                </div>
            )
        } else if (size == 'h1' && filter == 'source') {
            return (
                <div id="heading"> 
                   <h1> {heading} </h1>
                   <h5> Overall Tone Profile </h5>
                </div>
            )
        } else if (size=='h3' && filter == 'source') {
            return (
                <div id="heading"
                    style={{color:'black'}}>
                    <h3>All articles for source {heading}</h3>
                </div>
            )
        }else if (size == 'h5') {
            return (
                <div id="heading">
                   <h5> {heading} </h5>
                </div>
            )
        } else if (size == 'h3') {
            return (
                <div id="heading">
                   <h3> {heading} </h3>
                </div>
            ) 
        } else if (size == 'h4') {
            return (
                <div id="heading">
                   <h2> {heading} </h2>
                </div>
            )
        } 
    };
}

export default Heading;