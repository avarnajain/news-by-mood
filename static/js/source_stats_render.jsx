"use strict";

import React, {Component} from "react";
import ReactDOM from 'react-dom';
import App from './homepage.jsx';
import Stats from "./source_stats.jsx";

const content = (
    <div id="source-stats">
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <Stats fetch_url='/all-source-stats.json'
                            filter_by='source_name'/>
                </div>
            </div>
            <div className="row">
                <div className="col-4 offset-2">
                    <Stats fetch_url='/all-source-stats.json'
                              filter_by='emotional'
                              heading='Emotional Tones'/>
                </div>
                <div className="col-4">
                    <Stats fetch_url='/all-source-stats.json'
                              filter_by='language'
                              heading='Language Tones'/>
                </div>
            </div>
            <div className="row">
              <br />
            </div>
            <div className="row">
                <div className="col">
                    <Stats fetch_url='/all-source-stats.json'
                            filter_by='None'/>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Stats fetch_url='/all-source-stats.json'
                            filter_by='total'/>
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