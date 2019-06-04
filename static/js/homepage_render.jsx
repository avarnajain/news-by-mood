"use-strict";
import React, {Component} from "react";
import ReactDOM from 'react-dom';
import App from './homepage.jsx';
import PopoverButton from './popover_button.jsx'
import '../css/homepage.css';
import SourceForm from './source_form.jsx';

const content = (
    <div className="container-fluid">
        <div className="row">
            <div className="col">
                <h1>The News Personality Times</h1>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <h2>What's Your News Telling you?</h2>
            </div>
        </div>
        <div className="row">
            <div className="col-2 offset-1" id='tone-profile'>
                <h3>Emotional Tones</h3>
            </div>
            <div className="col-2" id='bubble-tone'>
                <PopoverButton 
                    tone='Anger'
                    body="Evoked due to injustice, conflict, humiliation, negligence or betrayal. If anger is active, the individual attacks the target, verbally or physically. If anger is passive, the person silently sulks and feels tension and hostility."/>
            </div>
            <div className="col-2"id='bubble-tone'>
                <PopoverButton 
                    tone='Fear'
                    body="A response to impending danger. It is a survival mechanism that is a reaction to some negative stimulus. It may be a mild caution or an extreme phobia."/>
            </div>
            <div className="col-2"id='bubble-tone'>
                <PopoverButton 
                    tone='Joy'
                    body="Joy or happiness has shades of enjoyment, satisfaction and pleasure. There is a sense of well-being, inner peace, love, safety and contentment."/>
            </div>
            <div className="col-2"id='bubble-tone'>
                <PopoverButton 
                    tone='Sadness'
                    body="Indicates a feeling of loss and disadvantage. When a person can be observed to be quiet, less energetic and withdrawn, it may be inferred that sadness exists."/>
            </div>
        </div>
        <div className="row">
            <div className="col-2 offset-2" id='tone-profile'>
                <h3>Language Tones</h3>
            </div>
            <div className="col-2"id='bubble-tone'>
                <PopoverButton 
                    tone='Analytical'
                    body="A person's reasoning and analytical attitude about things."/>
            </div>
            <div className="col-2"id='bubble-tone'>
                <PopoverButton 
                    tone='Confident'
                    body="A person's degree of certainty."/>
            </div>
            <div className="col-2"id='bubble-tone'>
                <PopoverButton 
                    tone='Tentative'
                    body="A person's degree of inhibition."/>
            </div>
        </div>
        <br />
        <div className="row">
            <div className="col">
                <h2>Do Your News Sources Have Peronalities Too?</h2>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <h3>Let's Find Out!</h3>
            </div>
        </div>
        <div className="row">
            <div className="col-6">
                <h3> Select A Source: </h3>
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




       