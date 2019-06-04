import React, { Component } from 'react';

class LoadingSpinner extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    fetchData = () => {
        this.setState({
            loading: true
        })
        setTimeOut(() => {
            this.setState({
                loading:false
            })
        }, 2000) 
    }

    render () {
        const {loading} = this.state;
        return (
            <div style={{marginTop: '60px'}}>
                <div class="spinner-grow text-secondary" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
                <div class="spinner-grow text-secondary" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
                <div class="spinner-grow text-secondary" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
                <div class="spinner-grow text-secondary" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
            </div>
        )
    }
}

export default LoadingSpinner;