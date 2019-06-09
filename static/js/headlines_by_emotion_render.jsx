"use strict";
import React, {Component} from "react";
import ReactDOM from 'react-dom';
import App from './homepage.jsx';
import News from "./news.jsx";
import Heading from './heading.jsx';
import DropdownMenu from './dropdownMenu.jsx';
import '../css/headlines.css';
import PopoverButton from './popover_button.jsx'
import PopoverButtonPhone from './popover_button_phone.jsx'
import CircleButton from './circle_button_list.jsx';
import {POPOVER_BODY} from './constants.jsx';
// import PopoverButtonList from './popover_button_list.jsx';

const content = (
    <div className="container-fluid">
        <div className="row" id="popovers">
            <div className="col" id="disappear-second"/>
            <div className="col" id="disappear-fourth"/>
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
            <div className="col" id="disappear-fifth"/>
            <div className="col" id="disappear-third"/>
            <div className="col" id="disappear-first"/>
        </div>
        <div className="row" id="phone-popovers">
            <div className="col" id="disappear-second"/>
            <div className="col" id="disappear-fourth"/>
            <div className="col" id='bubble-tone'>
                <PopoverButtonPhone
                    session='/session-emotion.json' 
                    tone='Anger'
                    type='emotion'
                    body={POPOVER_BODY['anger']}/>
            </div>
            <div className="col"id='bubble-tone'>
                <PopoverButtonPhone
                    session='/session-emotion.json' 
                    tone='Fear'
                    type='emotion'
                    body={POPOVER_BODY['fear']}/>
            </div>
            <div className="col"id='bubble-tone'>
                <PopoverButtonPhone 
                    session='/session-emotion.json' 
                    tone='Joy'
                    type='emotion'
                    body={POPOVER_BODY['joy']}/>
            </div>
            <div className="col"id='bubble-tone'>
                <PopoverButtonPhone 
                    session='/session-emotion.json' 
                    tone='Sadness'
                    type='emotion'
                    body={POPOVER_BODY['sadness']}/>
            </div>
            <div className="col"id='bubble-tone'>
                <PopoverButtonPhone 
                    session='/session-emotion.json' 
                    tone='Analytical'
                    type='language'
                    body={POPOVER_BODY['analytical']}/>
            </div>
            <div className="col"id='bubble-tone'>
                <PopoverButtonPhone 
                    session='/session-emotion.json' 
                    tone='Confident'
                    type='language'
                    body={POPOVER_BODY['confident']}/>
            </div>
            <div className="col"id='bubble-tone'>
                <PopoverButtonPhone 
                    session='/session-emotion.json' 
                    tone='Tentative'
                    type='language'
                    body={POPOVER_BODY['tentative']}/>
            </div>
            <div className="col" id="disappear-fifth"/>
            <div className="col" id="disappear-third"/>
            <div className="col" id="disappear-first"/>
        </div>
        <div className="row">
            <div className="col">
                <div className='heading'>
                    <Heading heading='/session-emotion.json'
                                size='h2'
                                filter='emotion'/>
                </div>
            </div>
            <div className="col">
                <div className="row">
                    <div className="col">
                        <DropdownMenu fetch_url='/get-category-dropdown-list.json'
                                        post_url='/get-chosen-category-from-dropdown'
                                        filter_by='Filter by Category'/>
                    </div>
                </div> 
                <div className="row">
                    <div className="col">
                        <Heading heading='/session-tone-category.json'
                                size='h5'
                                filter='category-filter'/>
                    </div>
                </div>
            </div>      
        </div>
        <div className="row">
            <div className="col">
                <div id="emotional-headlines">
                    <News fetch_url='/headlines-by-emotion.json'/>
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
