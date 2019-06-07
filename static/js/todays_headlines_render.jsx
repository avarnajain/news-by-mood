"use strict";
import React, {Component} from "react";
import ReactDOM from 'react-dom';
import App from './homepage.jsx';
import Stats from "./stats.jsx";
import News from "./news.jsx";
import Heading from './heading.jsx';
import DropdownMenu from './dropdownMenu.jsx';
import {POPOVER_BODY} from './constants.jsx';
import PopoverButton from './popover_button.jsx'
import '../css/index.css';

const content = (
    <div id="source-stats">
        <div className="container-fluid">
            <div className="row">
                <div className="col" id="disappear-second"/>
                <div className="col" id="disappear-fourth"/>
                <div className="col" id='bubble-tone'>
                    <PopoverButton
                        session='/session-emotion.json' 
                        tone='Anger'
                        type='emotion'
                        post_url='/get-chosen-tone-from-popover'
                        body={POPOVER_BODY['anger']}/>
                </div>
                <div className="col"id='bubble-tone'>
                    <PopoverButton
                        session='/session-emotion.json' 
                        tone='Fear'
                        type='emotion'
                        post_url='/get-chosen-tone-from-popover'
                        body={POPOVER_BODY['fear']}/>
                </div>
                <div className="col"id='bubble-tone'>
                    <PopoverButton 
                        session='/session-emotion.json' 
                        tone='Joy'
                        type='emotion'
                        post_url='/get-chosen-tone-from-popover'
                        body={POPOVER_BODY['joy']}/>
                </div>
                <div className="col"id='bubble-tone'>
                    <PopoverButton 
                        session='/session-emotion.json' 
                        tone='Sadness'
                        type='emotion'
                        post_url='/get-chosen-tone-from-popover'
                        body={POPOVER_BODY['sadness']}/>
                </div>
                <div className="col"id='bubble-tone'>
                    <PopoverButton 
                        session='/session-emotion.json' 
                        tone='Analytical'
                        type='language'
                        post_url='/get-chosen-tone-from-popover'
                        body={POPOVER_BODY['analytical']}/>
                </div>
                <div className="col"id='bubble-tone'>
                    <PopoverButton 
                        session='/session-emotion.json' 
                        tone='Confident'
                        type='language'
                        post_url='/get-chosen-tone-from-popover'
                        body={POPOVER_BODY['confident']}/>
                </div>
                <div className="col"id='bubble-tone'>
                    <PopoverButton 
                        session='/session-emotion.json' 
                        tone='Tentative'
                        type='language'
                        post_url='/get-chosen-tone-from-popover'
                        body={POPOVER_BODY['tentative']}/>
                </div>
                <div className="col" id="disappear-fifth"/>
                <div className="col" id="disappear-third"/>
                <div className="col" id="disappear-first"/>
            </div>
            <div className="row">
                <h2 id="heading">the world of news today</h2>
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