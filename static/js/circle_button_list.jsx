"use-strict";
import { Component } from 'react';
import { Button } from 'reactstrap';
import '../css/popover.css'

class CircleButton extends React.Component {
    constructor(props) {
        super(props);
    }
    createBubble = () => {
        let bubble = []
        const numberButtons = this.props.number;
        const text = this.props.text;
        // Outer loop to create parent
        for (let i = 0; i < numberButtons; i++) {
            for (let j = 0; j < text.length; j++) {
                const txt = text[j];
                // console.log('txt', txt);
                let children = []
                // console.log('i', i);
                bubble.push(
                    <div id={i + 'circle-btn-div'}>
                        <Button 
                            id='plain-button' 
                            type="button" 
                            className="btn btn-default btn-circle btn-xl">
                            <b>{txt}</b>
                        </Button>
                    </div>
                )
            }
            return bubble
        }
        return bubble;
    }
    render() {
        return(
            <div className="row">
                {this.createBubble()}
            </div>
        )
    }
};
export default CircleButton;