"use-strict";
import React, {Component} from "react";
import {TONE_COLORS} from './constants.jsx'
import {Dropdown, DropdownButton} from 'react-bootstrap';
import $ from 'jquery'; 
import Popper from 'popper.js';

class DropdownSources extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: []};
        // this.handleSubmit = this.handleSubmit.bind(this)
        this.handleSourceSelection = this.handleSourceSelection.bind(this)
    }
    //this executes when the page is loaded
    componentDidMount() {
        this.getSources();
    }

    handleSourceSelection(evt) {
        // console.log(evt);
        const selected_source = evt.target.value;
        this.setState({
            selected_source: evt.target.value
        }, () => {
            // console.log('this.state.selected_source, value:', this.state.selected_source)
            if (this.state.selected_source) {
                // console.log('inside fetch', this.state.post_url);
                fetch(this.props.post_url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        selected_source: this.state.selected_source
                    })
                })
                .then(() => {
                    window.location.href=`/source-stats/${this.state.selected_source}`
                });
            }
        });
    }

    getSources() {
        //.then() handles the response from the ajax call
        fetch(this.props.fetch_url)
        //tells it to handle response like a json object
        .then(response => response.json())
        //
        .then(data => {
            //console.log(data);
            this.setState({
                data: data
            })
        });
    }

    render() {
        const sources = this.state.data;
        // console.log('sources', sources);
        const dropdownList = sources.map((source) =>
            <div key={source.source}>
                <option onClick={this.handleSourceSelection} value={source.source}>{source.source}</option>
            </div>
        );
        return (
            <div>
                {dropdownList}
            </div>
        )
        
    };
}

export default DropdownSources;
