"use strict";
import React, {Component} from "react";
import ReactDOM from 'react-dom';
import App from './homepage.jsx';
import DropdownMenu from './dropdownMenu.jsx';
import '../css/headlines.css';
import PopoverButton from './popover_button.jsx'
import News from './news.jsx';
import {POPOVER_BODY} from './constants.jsx';

const content = (
    <div className="container-fluid">
        <div className="d-flex justify-content-center" id="popovers">
            <div className="d-none d-sm-block">
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
        </div>
        <div className="d-flex justify-content-center" 
             id="homepage-bubbles">
            <div className='d-block d-sm-none'>
                <div className="row">
                    <div className="col" id='bubble-tone'>
                        <PopoverButton id="homepage-pop"
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
        </div>
        <div className="d-flex justify-content-center" 
             id="homepage-bubbles">
            <div className="d-block d-sm-none">
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
        </div>
        <div className="d-flex justify-content-center" 
             id="tone-descripton-link">
            <div className="d-block d-sm-none">
                <div className="col">
                    <p>Click 
                        <a href={`/about#tone-table`}> here </a> 
                        to know more about each tone
                    </p>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <div id="individual-article">
                    <News fetch_url='/article.json'/>
                </div>
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
