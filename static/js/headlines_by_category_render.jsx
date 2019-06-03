"use strict";
import React, {Component} from "react";
import ReactDOM from 'react-dom';
import App from './homepage.jsx';
import News from "./news.jsx";
import Heading from './heading.jsx';
import Stats from './stats.jsx';
import DropdownMenu from './dropdown.jsx';

const content = (
    <div className="container-fluid">
        <div className="row">
            <div className="col">
                <div className='heading'>
                    <Heading heading='/session-category.json'/>
                </div>
            </div>
            <div className="col">
                <DropdownMenu fetch_url='/get-tone-dropdown-list.json'
                              post_url='/get-chosen-tone-from-dropdown'
                              filter_by='Filter by Tone'/>
            </div>
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
        <div className="row">
            <div className="col">
                <Stats fetch_url='/get-category-stats.json'
                    filter_by='None'/>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <Stats fetch_url='/get-category-stats.json'
                    filter_by='total'/>
            </div>
        </div>
        <div id="category-headlines">
            <News fetch_url='/get-category-tones-stats.json'/>
        </div>
    </div>
);

ReactDOM.render(
    <div id="homepage">
        <App content={content}/>
    </div>,
  document.getElementById('root')
);