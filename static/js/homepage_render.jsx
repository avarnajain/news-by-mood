"use-strict";
import React, {Component} from "react";
import ReactDOM from 'react-dom';
import App from './homepage.jsx';
import PopoverButton from './popover_button.jsx'
import '../css/homepage.css';
import SourceForm from './source_form.jsx';
import { Button } from 'reactstrap';
import CircleButton from './circle_button_list.jsx';

const content = (
    <div className="container-fluid">
        <div className="row">
            <div className="col">
                <h1>know your news</h1>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <h2>does it have a personality?</h2>
            </div>
        </div>
        <div className="row">
            <div className="col-12" id='plain-bubble'>
                <CircleButton number={12} text={['', '', '', '', '', '', '', '', '', '', '', '']}/>
            </div>
        </div>
        <div className="row">
            <div className="col-4" id='plain-bubble'>
                <CircleButton number={4} text={['', '', '', 'Emotions?']}/>
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
            <div className="col-4" id='plain-bubble'>
                <CircleButton number={4} text={['', '', '', '']}/>
            </div>
        </div>
        <div className="row">
            <div className="col-5" id='plain-bubble'>
                <CircleButton number={5} text={['', '', '', '', 'Opinions?']}/>
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
            <div className="col-4" id='plain-bubble'>
                <CircleButton number={4} text={['Click to know more!', '', '', '']}/>
            </div>
        </div>
        <div className="row">
            <div className="col" id='plain-bubble'>
                <CircleButton number={12} text={['', '', '', '', '', '', '', '', '', '', '', '']}/>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <h2>do news sources have peronalities too?</h2>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <h3>let's find out!</h3>
            </div>
        </div>
        <div className="row">
            <div className="col-12" id='plain-bubble'>
                <CircleButton number={12} text={['', '', '', '', '', <a href='/source-stats/CNN'>CNN</a>, '', '', '', '', '', '']}/>
            </div>
        </div>
        <div className="row">
            <div className="col-12" id='plain-bubble'>
                <CircleButton number={12} text={['', '', <a href='/source-stats/The%20New%20York%20Times'>The New York Times</a>, '', '', '', '', '', '', '', '', <a href='/'>See More</a>]}/>
            </div>
        </div>
        <div className="row">
            <div className="col-12" id='plain-bubble'>
                <CircleButton number={12} text={['', '', '', '', '', '', '', <a href='/source-stats/Fox%20News'>Fox News</a>, '', '', '', '']}/>
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




       