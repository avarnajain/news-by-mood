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
        <div className="row" id="homepage-bubbles">
            <div className="col" id='bubble-col-1'>
                <CircleButton number={4} text={['', '', '', '']}/>
            </div>
            <div className="col" id='bubble-col-2'>
                <CircleButton number={4} text={['', '', '', '']}/>
            </div>
            <div className="col" id='bubble-col-3'>
                <CircleButton number={4} text={['', '', '', '']}/>
            </div>
            <div className="col" id='mixed-bubble-1'>
                <CircleButton number={4} text={['', 'Emotions', '', '']}/>
            </div>
            <div className="col" id='mixed-bubble-2'>
                <div className="row">
                    <div className="col-1" id='plain-bubble'>
                        <CircleButton number={1} text={['']}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-1"id='bubble-tone'>
                        <PopoverButton 
                            tone='Anger'
                            type='emotion'
                            body={POPOVER_BODY['anger']}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col" id='plain-bubble'>
                        <CircleButton number={2} text={['Opinions', '']}/>
                    </div>
                </div>
            </div>
            <div className="col" id="mixed-bubble-3">
                <div className="row">
                    <div className="col" id='plain-bubble'>
                        <CircleButton number={1} text={['']}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-1"id='bubble-tone'>
                        <PopoverButton 
                            tone='Fear'
                            type='emotion'
                            body={POPOVER_BODY['fear']}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-1"id='bubble-tone'>
                        <PopoverButton 
                            tone='Analytical'
                            type='language'
                            body={POPOVER_BODY['analytical']}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-1" id='plain-bubble'>
                        <CircleButton number={1} text={['']}/>
                    </div>
                </div>
            </div>
            <div className="col" id="mixed-bubble-4">
                <div className="row">
                    <div className="col-1" id='plain-bubble'>
                        <CircleButton number={1} text={['']}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-1"id='bubble-tone'>
                        <PopoverButton 
                            tone='Joy'
                            type='emotion'
                            body={POPOVER_BODY['joy']}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-1"id='bubble-tone'>
                        <PopoverButton 
                            tone='Confident'
                            type='language'
                            body={POPOVER_BODY['confident']}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-1" id='plain-bubble'>
                        <CircleButton number={1} text={['']}/>
                    </div>
                </div>
            </div>
            <div className="col" id='mixed-bubble-5'>
                <div className="row">
                    <div className="col-1" id='plain-bubble'>
                        <CircleButton number={1} text={['']}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-1"id='bubble-tone'>
                        <PopoverButton 
                            tone='Sadness'
                            type='emotion'
                            body={POPOVER_BODY['sadness']}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-1"id='bubble-tone'>
                        <PopoverButton 
                            tone='Tentative'
                            type='language'
                            body={POPOVER_BODY['tentative']}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-1" id='plain-bubble'>
                        <CircleButton number={1} text={['']}/>
                    </div>
                </div>
            </div>
            <div className="col" id='mixed-bubble-6'>
                <CircleButton number={4} text={['', '', '', '']}/>
            </div>
            <div className="col" id='bubble-col-4'>
                <CircleButton number={4} text={['', '', '', '']}/>
            </div>
            <div className="col" id='bubble-col-5'>
                <CircleButton number={4} text={['', '', '', '']}/>
            </div>
            <div className="col" id='bubble-col-6'>
                <CircleButton number={4} text={['', '', '', '']}/>
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




       