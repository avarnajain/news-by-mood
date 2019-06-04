"use-strict";
import React, {Component} from "react";
import {TONE_COLORS} from './constants.jsx'
import {Dropdown, DropdownButton} from 'react-bootstrap';
import $ from 'jquery'; 
import Popper from 'popper.js';

class DropdownItems extends React.Component {
    
    //import state property from React Component class, 
    //set state as empty
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this.handleToneSubmit = this.handleToneSubmit.bind(this)
        this.handleCategorySubmit = this.handleCategorySubmit.bind(this)

    }
    // this executes when the page is loaded
    componentDidMount() {
        this.getFilters();
    }

    handleToneSubmit(evt){
        const selected_tone = evt.target.value;
        evt.preventDefault();
        fetch(this.props.post_url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            body: JSON.stringify({
                selected_tone: selected_tone
            })
        })
        .then(() => {
            window.location.href=this.props.redirect
        });
    }

    handleCategorySubmit(evt){
        const selected_category = evt.target.value;
        evt.preventDefault();
        fetch(this.props.post_url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            body: JSON.stringify({
                selected_category: selected_category
            })
        })
        .then(() => {
            window.location.href=this.props.redirect
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
        if (this.props.filter_by == 'tone') {
            // console.log('filters', filters);
            const dropdownList = filters.map((filter) =>
                <div key={filter.tone_id.toString()}>
                    <option onClick={this.handleToneSubmit} value={filter.tone_id}>{filter.tone_name}</option>
                </div>
            );
            return (
                <div>
                    {dropdownList}
                </div>
            )
        } else if (this.props.filter_by == 'category') {
            const dropdownList = filters.map((filter) =>
                <div key={filter.category_id.toString()}>
                    <option onClick={this.handleCategorySubmit} value={filter.category_id}>{filter.category_id}</option>
                </div>
            );
            return (
                <div>
                    {dropdownList}
                </div>
            )
        }
    };
}

export default DropdownItems;
