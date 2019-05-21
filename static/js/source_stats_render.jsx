"use strict";

import React, {Component} from "react";
import ReactDOM from 'react-dom';
import App from './homepage.jsx';
import Stats from "./source_stats.jsx";

const content = (
    <div id="source-stats">
        <Stats fetch_url='/all-source-stats.json'
                  filter_by='source_name'/>
        <Stats fetch_url='/all-source-stats.json'
                  filter_by='emotional'
                  heading='Emotional Tones'/>
        <Stats fetch_url='/all-source-stats.json'
                  filter_by='language'
                  heading='Language Tones'/>
        <Stats fetch_url='/all-source-stats.json'
                filter_by='None'/>
        <Stats fetch_url='/all-source-stats.json'
                filter_by='total'/>
    </div>
);

ReactDOM.render(
  
    <div id="homepage">
        <App content={content}/>
    </div>,
  document.getElementById('root')
);