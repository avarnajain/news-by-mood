"use strict";
import React, {Component} from "react";
import ReactDOM from 'react-dom';
import App from './homepage.jsx';
// import PopoverButton from './popover_button.jsx'
import SimpleTable from './tones_table.jsx';

const content = (
    <div className="container-fluid">
        <div className="d-flex justify-content-center">
            <div className="row">
                <div className="col">
                    <h1> About </h1>
                    <SimpleTable/>
                </div>
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
