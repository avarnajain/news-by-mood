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
import PopoverButtonPhone from './popover_button_phone.jsx'
import '../css/headlines.css';
// import '../css/index.css';

const content = (
    <div id="source-stats">
        <div className="container-fluid">
            <div className="d-flex justify-content-center" id="popovers">
                <div className="row">
                    <div className="col" id='bubble-tone'>
                        <PopoverButton
                            session='/session-emotion.json' 
                            tone='Anger'
                            type='emotion'
                            body={POPOVER_BODY['anger']}/>
                    </div>
                    <div className="col"id='bubble-tone'>
                        <PopoverButton
                            session='/session-emotion.json' 
                            tone='Fear'
                            type='emotion'
                            body={POPOVER_BODY['fear']}/>
                    </div>
                    <div className="col"id='bubble-tone'>
                        <PopoverButton 
                            session='/session-emotion.json' 
                            tone='Joy'
                            type='emotion'
                            body={POPOVER_BODY['joy']}/>
                    </div>
                    <div className="col"id='bubble-tone'>
                        <PopoverButton 
                            session='/session-emotion.json' 
                            tone='Sadness'
                            type='emotion'
                            body={POPOVER_BODY['sadness']}/>
                    </div>
                    <div className="col"id='bubble-tone'>
                        <PopoverButton 
                            session='/session-emotion.json' 
                            tone='Analytical'
                            type='language'
                            body={POPOVER_BODY['analytical']}/>
                    </div>
                    <div className="col"id='bubble-tone'>
                        <PopoverButton 
                            session='/session-emotion.json' 
                            tone='Confident'
                            type='language'
                            body={POPOVER_BODY['confident']}/>
                    </div>
                    <div className="col"id='bubble-tone'>
                        <PopoverButton 
                            session='/session-emotion.json' 
                            tone='Tentative'
                            type='language'
                            body={POPOVER_BODY['tentative']}/>
                    </div>
                </div>
            </div>
            <div className="row">
                <h2 id="heading">the world of news today</h2>
            </div>
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <Stats fetch_url='/todays-stats.json'
                              filter_by='emotional'
                              heading='% distribution of emotional tones*'
                              post_url='/todays-headlines'/>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
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
                        *pie percentages are weighted per cent based on the score of each tone in an article
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