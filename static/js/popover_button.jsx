"use-strict";
import { Component } from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import {TONE_COLORS} from './constants.jsx'

class PopoverButton extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      popoverOpen: false,
    };
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  render() {
    const tone = this.props.tone;
    const body = this.props.body;
    const tone_color = tone.slice(0, 1).toLowerCase() + tone.slice(1);
    const divStyle = {
      backgroundColor: TONE_COLORS[tone_color],
      borderColor: TONE_COLORS[tone_color],
      color:'white'
    };
    return (
      <div id={tone}>
        <Button 
          style={divStyle}
          id='Popover1' 
          type="button" 
          className="btn btn-default btn-circle btn-xl">
          <b>{tone}</b>
        </Button>
        <Popover placement="bottom" isOpen={this.state.popoverOpen} target={tone} toggle={this.toggle}>
          <PopoverHeader>{tone}</PopoverHeader>
          <PopoverBody>{body}</PopoverBody>
        </Popover>
      </div>
    );
  }
};

export default PopoverButton;