"use-strict";
import { Component } from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import {TONE_COLORS, POPOVER_BODY} from './constants.jsx'
import '../css/popover.css'

const typeToUrl = {
  'emotion': '/headlines-by-emotion',
  'language': '/headlines-by-language'
} 

class PopoverButtonPhone extends React.Component {
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
  // setIsOpen() {
  //   this.setState({
  //     popoverOpen: true
  //   });
  // }
  // setIsClose() {
  //   this.setState({
  //     popoverOpen: false
  //   });
  // }
  render() {
    const session = this.state.data;
    const tone = this.props.tone;
    const body = this.props.body;
    const type = this.props.type;
    const urlBase = typeToUrl[type];
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
    let id = ''
    if (tone == session) {
      id = 'selected-tone-popover'
    } else {
      id = tone
    }
    return (
      <div id="pops">
      <div className="row">
        <div id={id} onClick={this.toggle}>
          <Button 
            style={divStyle}
            id='Popover1' 
            type="button" 
            className="btn btn-default btn-circle btn-xl">
            <b>{tone}!</b>
          </Button>
        </div>
        <Popover placement="bottom" isOpen={this.state.popoverOpen} target="pops" onClick={this.toggle}>
          <PopoverHeader>{tone}</PopoverHeader>
          <PopoverBody>{body}</PopoverBody>
        </Popover>
      </div>
      </div>
    )
  }
};

export default PopoverButtonPhone;