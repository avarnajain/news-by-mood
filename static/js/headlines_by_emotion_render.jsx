"use strict";
import React, {Component} from "react";
import ReactDOM from 'react-dom';
import App from './homepage.jsx';
import News from "./news.jsx";
import Heading from './heading.jsx';
import DropdownMenu from './dropdownMenu.jsx';
import '../css/headlines.css';
import PopoverButton from './popover_button.jsx'
import CircleButton from './circle_button.jsx';

const content = (
    <div className="container-fluid">
        <div className="row">
            <div className="col-2" id='plain-bubble'>
                <CircleButton number={2} text={['','']}/>
            </div>
            <div className="col-1" id='bubble-tone'>
                <PopoverButton 
                    tone='Anger'
                    body="Evoked due to injustice, conflict, humiliation, negligence or betrayal. If anger is active, the individual attacks the target, verbally or physically. If anger is passive, the person silently sulks and feels tension and hostility."/>
            </div>
            <div className="col-1"id='bubble-tone'>
                <PopoverButton
                    tone='Fear'
                    body="A response to impending danger. It is a survival mechanism that is a reaction to some negative stimulus. It may be a mild caution or an extreme phobia."/>
            </div>
            <div className="col-1"id='bubble-tone'>
                <PopoverButton 
                    tone='Joy'
                    body="Joy or happiness has shades of enjoyment, satisfaction and pleasure. There is a sense of well-being, inner peace, love, safety and contentment."/>
            </div>
            <div className="col-1"id='bubble-tone'>
                <PopoverButton 
                    tone='Sadness'
                    body="Indicates a feeling of loss and disadvantage. When a person can be observed to be quiet, less energetic and withdrawn, it may be inferred that sadness exists."/>
            </div>
            <div className="col-1"id='bubble-tone'>
                <PopoverButton 
                    tone='Analytical'
                    body="A person's reasoning and analytical attitude about things."/>
            </div>
            <div className="col-1"id='bubble-tone'>
                <PopoverButton 
                    tone='Confident'
                    body="A person's degree of certainty."/>
            </div>
            <div className="col-1"id='bubble-tone'>
                <PopoverButton 
                    tone='Tentative'
                    body="A person's degree of inhibition."/>
            </div>
            <div className="col-3" id='plain-bubble'>
                <CircleButton number={3} text={['','','']}/>
            </div>
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
