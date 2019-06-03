"use strict";

import React, {Component} from "react";
import ReactDOM from 'react-dom';
import App from './homepage.jsx';
import Stats from "./stats.jsx";
import News from "./news.jsx"

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
                <div className="col-6">
                    <Stats fetch_url='/all-source-stats.json'
                              filter_by='emotional'
                              heading='Emotional Tones'
                              post_url='/get-source-news'/>
                </div>
                <div className="col-6">
                    <Stats fetch_url='/all-source-stats.json'
                              filter_by='language'
                              heading='Language Tones'
                              post_url='/get-source-news'/>
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
            <div className="sourceNews">
                <News fetch_url='/source-news.json'/>
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