"use-strict";
import React, {Component} from "react";
import ReactDOM from 'react-dom';
import App from './homepage.jsx';
import PopoverButton from './popover_button.jsx'
import '../css/homepage.css';
import '../css/headlines.css';
import SourceForm from './source_form.jsx';
import { Button } from 'reactstrap';
import CircleButton from './circle_button_list.jsx';
import {POPOVER_BODY} from './constants.jsx';
import Stats from './stats.jsx';
import DropdownSources from './dropdownSources.jsx';
import HomepageDropdownMenu from './homepage_source_dropdown.jsx';

const content = (
    <div className="container-fluid">
        <div className="row">
            <div className="col" id="heading">
                <h1>know your news</h1>
            </div>
        </div>
        <div className="row">
            <div className="col" id="secondary-heading">
                <h2>does it have a personality?</h2>
            </div>
        </div>
        <div className="row">
            <div className="col" id="tertiary-heading">
                <a href='/todays-headlines'><h3>Find out how the world is doing today</h3></a>
            </div>
        </div>
        <div className="d-flex justify-content-center" id="homepage-bubbles">
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
            </div>
        </div>
        <div className="d-flex justify-content-center" id="homepage-bubbles">
            <div className="row">
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
            <div className="col" id="secondary-heading">
                <h2>do news sources have peronalities too?</h2>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <HomepageDropdownMenu fetch_url='/all-sources.json'
                                post_url='/get-chosen-source'
                                filter_by='Source Personaity'/>
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




       