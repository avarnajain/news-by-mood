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
                <div className="col">
                    <Heading heading='/session-source.json'
                                size='h1'/>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <Stats fetch_url='/all-source-stats.json'
                              filter_by='emotional'
                              heading='% distribution of emotional tones*'
                              post_url='/get-source-news'/>
                </div>
                <div className="col-6">
                    <Stats fetch_url='/all-source-stats.json'
                              filter_by='language'
                              heading='% distribution of language tones*'
                              post_url='/get-source-news'/>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Stats fetch_url='/all-source-stats.json'
                            filter_by='total'/>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <h6>*weighted based on the score of each tone in an article</h6>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Stats fetch_url='/all-source-stats.json'
                            filter_by='None'/>
                </div>
            </div>
            <div className="row">
              <br />
            </div>
            <div className="row">
                <div className="col">
                    <DropdownMenu fetch_url='/get-category-dropdown-list.json'
                                post_url='/get-chosen-category-within-source'
                                filter_by='Filter by Category'/>
                </div>
                <div className="col">
                    <DropdownMenu fetch_url='/get-emotional-dropdown-list.json'
                                  post_url='/get-chosen-tone-within-source'
                                  filter_by='Filter by Emotion'/>
                </div>
                <div className="col">
                    <DropdownMenu fetch_url='/get-language-dropdown-list.json'
                                  post_url='/get-chosen-tone-within-source'
                                  filter_by='Filter by Language'/>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Heading heading='/session-source-category.json'
                                size='h4'/>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Heading heading='/session-source-tone.json'
                                size='h4'/>
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