"use strict";
import React, {Component} from "react";
import ReactDOM from 'react-dom';
import App from './homepage.jsx';
import PopoverButton from './popover_button.jsx'
import {POPOVER_BODY} from './constants.jsx';
import LineGraph from './line_graph.jsx';

const content = (
    <div className="container-fluid">
        <div className="row">
            <div className="col">
                <h1> About </h1>
                <LineGraph/>
            </div>
        </div>
    </div>
);

ReactDOM.render(
  
    <div id="homepage">
        <App content={content}/>
    </div>,
  document.getElementById('root')
);
