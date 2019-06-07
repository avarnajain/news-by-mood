"use strict";
import React, {Component} from "react";
import ReactDOM from 'react-dom';
import App from './homepage.jsx';
import Stats from "./stats.jsx";
import News from "./news.jsx";
import Heading from './heading.jsx';
import DropdownMenu from './dropdownMenu.jsx';

const content = (
    <div id="source-stats">
        <div className="container-fluid">
            <div className="row">
                <h1>TODAY</h1>
            </div>
            <div className="row">
                <div className="col-6">
                    <Stats fetch_url='/todays-stats.json'
                              filter_by='emotional'
                              heading='% distribution of emotional tones*'
                              post_url='/todays-headlines'/>
                </div>
                <div className="col-6">
                    <Stats fetch_url='/todays-stats.json'
                              filter_by='language'
                              heading='% distribution of language tones*'
                              post_url='/todays-headlines'/>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Stats fetch_url='/todays-stats.json'
                            filter_by='total'/>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <h6 id='weighted-pie-statement'>
                        *weighted per cent based on the score of each tone in an article
                    </h6>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Stats fetch_url='/todays-stats.json'
                            filter_by='None'/>
                </div>
            </div>
            <div className="row">
              <br />
            </div>
            <div className="sourceNews">
                <News fetch_url='/todays-news.json'/>
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