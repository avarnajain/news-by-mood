"use strict";
import React, {Component} from "react";
import ReactDOM from 'react-dom';
import App from './homepage.jsx';
import News from "./news.jsx";
import Heading from './heading.jsx';
import Stats from './stats.jsx';

const content = (
    <div id="category-headlines">
        <div className='heading'>
            <Heading heading='/session-category.json'/>
        </div>
        <div className="row">
            <div className="col-6">
                <Stats fetch_url='/get-category-stats.json'
                          filter_by='emotional'
                          heading='Emotional Tones'
                          post_url='/get-category-tone-filter'/>
            </div>
            <div className="col-6">
                <Stats fetch_url='/get-category-stats.json'
                          filter_by='language'
                          heading='Language Tones'
                          post_url='/get-category-tone-filter'/>
            </div>
        </div>
        <News fetch_url='/get-category-tones-stats.json'/>
    </div>
);

ReactDOM.render(
    <div id="homepage">
        <App content={content}/>
    </div>,
  document.getElementById('root')
);