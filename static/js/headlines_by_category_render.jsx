"use strict";
import React, {Component} from "react";
import ReactDOM from 'react-dom';
import App from './homepage.jsx';
import News from "./news.jsx";
import Heading from './heading.jsx';
import Stats from './stats.jsx';
import DropdownMenu from './dropdownMenu.jsx';

const content = (
    <div className="container-fluid">
        <div className="row">
            <div className="col">
                <div className='heading'>
                    <Heading heading='/session-category.json'
                                    size='h1'/>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-6">
                <Stats fetch_url='/get-category-stats.json'
                    filter_by='emotional'
                    heading='% distribution of emotional tones*'
                    post_url='/get-category-tone-filter'/>
            </div>
            <div className="col-6">
                <Stats fetch_url='/get-category-stats.json'
                    filter_by='language'
                    heading='% distribution of language tones*'
                    post_url='/get-category-tone-filter'/>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <Stats fetch_url='/get-category-stats.json'
                    filter_by='total'/>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <h6 id='weighted-pie-statement'>
                    *weighted based on the score of each tone in an article
                </h6>
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
                <div className="row">
                    <div className="col">
                        <DropdownMenu fetch_url='/get-emotional-dropdown-list.json'
                                      post_url='/get-chosen-tone-from-dropdown'
                                      filter_by='Filter by Emotion'/>
                    </div>
                    <div className="col">
                        <DropdownMenu fetch_url='/get-language-dropdown-list.json'
                                      post_url='/get-chosen-tone-from-dropdown'
                                      filter_by='Filter by Opinion'/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Heading heading='/session-category-tone.json'
                            size='h4'/>
                    </div>
                </div>
            </div>
        </div>
        <div id="category-headlines">
            <News fetch_url='/get-category-tone-news.json'/>
        </div>
    </div>
);

ReactDOM.render(
    <div id="homepage">
        <App content={content}/>
    </div>,
  document.getElementById('root')
);