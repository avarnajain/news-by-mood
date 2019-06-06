import React, { Component } from 'react';
import '../css/spinner.css';

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
            <div style={{marginTop: '60px'}} id="all-spinners">
                <div className="spinner-grow" id='spinner-1' role="status">
                  <span className="sr-only">Loading...</span>
                </div>
                <div className="spinner-grow" id='spinner-2' role="status">
                  <span className="sr-only">Loading...</span>
                </div>
                <div className="spinner-grow" id='spinner-3' role="status">
                  <span className="sr-only">Loading...</span>
                </div>
                <div className="spinner-grow" id='spinner-4' role="status">
                  <span className="sr-only">Loading...</span>
                </div>
                <div className="spinner-grow" id='spinner-5' role="status">
                  <span className="sr-only">Loading...</span>
                </div>
                <div className="spinner-grow" id='spinner-6' role="status">
                  <span className="sr-only">Loading...</span>
                </div>
                <div className="spinner-grow" id='spinner-7' role="status">
                  <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    }
}

export default LoadingSpinner;