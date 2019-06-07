"use-strict";
import { Component } from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import {TONE_COLORS, POPOVER_BODY} from './constants.jsx'
import '../css/popover.css'

const typeToUrl = {
  'emotion': '/headlines-by-emotion',
  'language': '/headlines-by-language'
}

class PopoverButton extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          popoverOpen: false,
          data: [],
          selected_popover: null
      };
      this.handleSubmit = this.handleSubmit.bind(this)
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
  setIsOpen() {
    this.setState({
      popoverOpen: true
    });
  }
  setIsClose() {
    this.setState({
      popoverOpen: false
    });
  }
  handleSubmit(evt){
    console.log('evt', evt);
    this.setState({
        selected_pie_tone: evt.target.value.toLowerCase()
    }, () => {
      evt.preventDefault();
      if (this.state.selected_pie_tone) {
      // console.log('handleSubmit()', this.props.post_url)
        fetch(this.props.post_url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            body: JSON.stringify({
                selected_popover: this.state.selected_popover
            })
        })
        .then(() => {
            window.location.href=`${typeToUrl[this.props.type]}`
        }); 
      } 
    }
    // const selected_popover = ;
    // const lower_case = selected_popover.toLowerCase();
    // console.log('handleSubmit(), value:', selected_popover);
    // console.log('lower_Case value:', lower_case);
    // console.log('postUrl', this.props.post_url)
    //prevents from posting with flask request
    );
  }
  render() {
    const session = this.state.data;
    const tone = this.props.tone;
    const body = this.props.body;
    // console.log('session', session, 'tone', tone);
    // console.log('props', this.props);

    const type = this.props.type;
    // console.log('type', type);
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
      // console.log('selected tone');
      id = 'selected-tone-popover'
    } else {
      id = tone
    }
    return (
      <div id="pops">
      <div id={id} className="row">
        <div onMouseEnter={() => this.setIsOpen()} onMouseLeave={() =>this.setIsClose()} id="pop">
          <Button 
            onClick={this.handleSubmit}
            style={divStyle}
            id='Popover1' 
            type="button" 
            className="btn btn-default btn-circle btn-xl">
            <option>{tone}</option>
          </Button>
        </div>
        <Popover placement="bottom" isOpen={this.state.popoverOpen} target={id}>
          <PopoverHeader>{tone}</PopoverHeader>
          <PopoverBody>{body}</PopoverBody>
        </Popover>
      </div>
      </div>
    )
  }
};

export default PopoverButton;