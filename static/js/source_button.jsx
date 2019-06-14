"use-strict";
import { Component } from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import {TONE_COLORS, POPOVER_BODY} from './constants.jsx'
import '../css/popover.css'

class SourceButton extends React.Component {
  constructor(props) {
      super(props);
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
  render() {
    let source = this.props.source;
    if (source == "BBC") {
      source = "Bbc.com"
    }
    const type = this.props.type;
    const urlBase = '/get-chosen-source';
    const divStyle = {
      backgroundColor: "rgba(0, 0, 0, 0.85)",
      borderColor: 'rgba(0, 0, 0, 0.85)',
      color:'white'
    };
    // console.log('url', urlBase, '/', source)
    return (
      <div id="source-button">
        <a href={`${urlBase}/${source}`}>
          <Button 
            style={divStyle}
            id='Popover1' 
            type="button" 
            className="btn btn-default btn-circle btn-xl">
            <b>{this.props.source}</b>
          </Button>
        </a>
      </div>
    )
  }
};

export default SourceButton;