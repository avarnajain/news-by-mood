"use-strict";
import { Component } from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import {TONE_COLORS} from './constants.jsx'
import '../css/popover.css'

class PopoverButton extends React.Component {
  constructor(props) {
      super(props);
      this.toggle = this.toggle.bind(this);
      this.state = {
          popoverOpen: false,
          data: []
      };
  }
  componentDidMount() {
      this.getSession();
  }   
  getSession() {
      fetch(this.props.session)
      .then(response => response.json())
      .then(data => {
          this.setState({
              data: data
          })
      });
  }
  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }
  render() {
    const session = this.state.data;
    const tone = this.props.tone;
    const body = this.props.body;
    // console.log('session', session, 'tone', tone);
    const tone_color = tone.slice(0, 1).toLowerCase() + tone.slice(1);
    const divStyle = {
      backgroundColor: TONE_COLORS[tone_color],
      borderColor: TONE_COLORS[tone_color],
      color:'white'
    };
    const selectedDivStyle = {
      backgroundColor: TONE_COLORS[tone_color],
      borderColor: TONE_COLORS[tone_color],
      color:'white'
    };
    if (tone == session) {
      // console.log('selected tone');
      return (
        <div id='selected-tone-popover' className="row">
            <Button 
              style={selectedDivStyle}
              id='Popover1' 
              type="button" 
              className="btn btn-default btn-circle btn-xl">
              <a><b>{tone}</b></a>
            </Button>
            <Popover placement="bottom" isOpen={this.state.popoverOpen} target={tone} toggle={this.toggle}>
              <PopoverHeader>{tone}</PopoverHeader>
              <PopoverBody>{body}</PopoverBody>
            </Popover>
        </div>
      );
    } else {
      return (
        <div id={tone} className="row">
          <Button 
            style={divStyle}
            id='Popover1' 
            type="button" 
            className="btn btn-default btn-circle btn-xl">
            <a><b>{tone}</b></a>
          </Button>
          <Popover placement="bottom" isOpen={this.state.popoverOpen} target={tone} toggle={this.toggle}>
            <PopoverHeader>{tone}</PopoverHeader>
            <PopoverBody>{body}</PopoverBody>
          </Popover>
        </div>
      )
    }
  }
};

export default PopoverButton;