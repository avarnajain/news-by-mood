"use-strict";
import React, {Component} from "react";
import ReactDOM from 'react-dom';
import App from './homepage.jsx';
import PopoverButton from './popover_button.jsx'
import SourceButton from './source_button.jsx'
import '../css/homepage.css';
import '../css/headlines.css';
import SourceForm from './source_form.jsx';
import { Button } from 'reactstrap';
import {POPOVER_BODY} from './constants.jsx';
import Stats from './stats.jsx';
import DropdownSources from './dropdownSources.jsx';
import HomepageDropdownMenu from './homepage_source_dropdown.jsx';

const content = (
    <div className="container-fluid">
        <div className="row">
            <div className="col" id="heading">
                <h1>Know Your News</h1>
            </div>
        </div>
        <div className="row">
            <div className="col" id="tertiary-heading">
                <a href='/todays-headlines'>
                    <h4>How does the world feel today?</h4>
                </a>
            </div>
        </div>
        <div className="row">
            <div className="col" id="secondary-heading">
                <h4>Does news have a personality?</h4> 
                <h5>How does it make you feel? Is it opinionated?</h5>
            </div>
        </div>
        <div className="d-flex justify-content-center" 
             id="homepage-bubbles">
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
        <div className="d-flex justify-content-center" 
             id="homepage-bubbles">
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
        <div className="d-flex justify-content-center" 
             id="tone-descripton-link">
            <div className="d-block d-sm-none">
                <div className="col">
                    <p>Click 
                        <a href="/about"> here </a> 
                        to know more about each tone
                    </p>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col" id="secondary-heading">
                <div id="news-today-link" style={{padding:"10px"}}>
                    <h4>Do news sources have peronalities too?</h4>
                </div>
            </div>
        </div>
        <div className="d-flex justify-content-center" 
             id="source-bubbles">
                <div className="row">
                    <div className="col" id='bubble-tone'>
                        <SourceButton 
                            id="source-pop" 
                            source='Fox News'
                            type='source'/>
                    </div>
                    <div className="col"id='bubble-tone'>
                        <SourceButton 
                            id="source-pop"
                            source='CNN'
                            type='source'/>
                    </div>
                    <div className="col"id='bubble-tone'>
                        <SourceButton 
                            id="source-pop" 
                            source='The New York Times'
                            type='source'/>
                    </div>
                    <div className="col"id='bubble-tone'>
                        <SourceButton  
                            id="source-pop"
                            source='Daily Mail'
                            type='source'/>
                    </div>
            </div>
        </div>
        <div className="d-flex justify-content-center">
            <div className="d-none d-sm-block">
                <div className="col">
                    <HomepageDropdownMenu fetch_url='/all-sources.json'
                                    post_url='/get-chosen-source'
                                    filter_by='Select Source'/>
                </div>
            </div>
        </div>
        <div className="d-flex justify-content-center" 
             id="tone-descripton-link">
            <div className="d-block d-sm-none">
                <div className="col">
                    <p>Select one to find out!</p>
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





       