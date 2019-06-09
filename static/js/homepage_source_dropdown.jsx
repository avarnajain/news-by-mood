"use-strict";
import React, {Component} from "react";
import {TONE_COLORS} from './constants.jsx'
// import {Dropdown, DropdownButton} from 'react-bootstrap'
import {Dropdown, DropdownButton} from 'react-bootstrap';
// import {DropdownButton} from 'react-bootstrap/DropdownButton';
import $ from 'jquery'; 
import Popper from 'popper.js';
import '../css/dropdownMenu.css';
import '../css/dropdown.css';

class HomepageDropdownMenu extends React.Component {
    
    //import state property from React Component class, 
    //set state as empty
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this.handleSubmit = this.handleSubmit.bind(this)
        // this.select = this.select.bind(this);
        // this.handleFilterSelection = this.handleFilterSelection.bind(this)
    }

    // this executes when the page is loaded
    componentDidMount() {
        this.getFilters();
    }

    handleSubmit(evt){
        // console.log('evt', evt);
        const selected_source = evt.target.value;
        console.log('handleFilterSelection(), value:', selected_source)
        //prevents from posting with flask request
        evt.preventDefault();
        // console.log('handleSubmit()', this.props.post_url)
        fetch(this.props.post_url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            body: JSON.stringify({
                selected_source: selected_source
            })
        })
        .then(() => {
            window.location.href=`/source-stats/${selected_source}`
        });
    }


    getFilters() {
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
        const filters = this.state.data;
        // console.log('filters', filters);
        const dropdownList = filters.map((filter) =>
            <div key={filter.source.toString()} id='dropdown-item'>
                <option onClick={this.handleSubmit} value={filter.source}>{filter.source}</option>
            </div>
        );
        return (
            <div className="col">
                <DropdownButton id="dropdown-button" title={this.props.filter_by}>
                    {dropdownList}
                </DropdownButton>
            </div>
        )
    };
}

export default HomepageDropdownMenu;
