"use strict";
import React, {Component} from "react";
import ReactDOM from 'react-dom';
import App from './homepage.jsx';
// import PopoverButton from './popover_button.jsx'
import SimpleTable from './tones_table.jsx';
import '../css/about.css';
import SocialFollow from './social_follow.jsx';
import '../css/social_follow.css';

const content = (
    <div className="container-fluid">
            <div className="justify-content-center row">
                <div className="col heading">
                    <h2>About News By Mood</h2>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <div className="row about-created-by">
                    <h5>Created by Avarna Jain</h5>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <div className="row" id="about-social-row">
                    <div className="col" id="about-social-col">
                        <SocialFollow />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col info-body">
                    <h6>
                        <br />
                        For many, the idea of reading the news has 
                        become synonymous with becoming upset. 
                        So much so that some have given up on reading 
                        the news entirely to prevent these feelings.
                        <br/> <br/>
                        The goal behind News By Mood was to understand 
                        how news articles can elicit specific emotional 
                        responses within their readers and give 
                        these readers an “emotional profile” of the article 
                        before they read it.
                    </h6>
                    <br />
                    <h6> 
                        <u>How it works</u>   
                        <br />
                        News By Mood pulls in approximately 100 articles a 
                        day, across various news sources, within the United 
                        States. A user can can filter these articles by the 
                        emotional (anger, fear, joy, sadness) or opionion/language 
                        (analytical, confident, tentative) tones, or by the category 
                        of news they want to read. They can also evaluate the 
                        "personality profiles” of news sources to see what 
                        types of articles the source puts out. This is an effort 
                        to make more clear the subjective and objective tendencies 
                        of sources to write articles that make their readers 
                        feel a certain way, or how these sources present 
                        their data and conclusions (or lack thereof).
                        <br/>
                    </h6>
                    <h6>
                        <u>Future Ideas</u><br />
                        It would interesting to see how different sources
                        rank based on their overall tone profiles. 
                        To make it more statistically significant, it would 
                        be useful to incorporate more news from multiple 
                        APIs, in order to provide a 
                        well-rounded view of each source’s personality.     
                    </h6>
                    <h6>
                        <u>Technologies Used</u><br />
                        APIs: <a href="https://newsapi.org/docs"> News API</a>, 
                        <a href="https://cloud.ibm.com/apidocs/tone-analyzer"
                        > IBM Watson Tone Analyzer</a>
                        <br/>
                        Python, Javascript, React, AJAX, Webpack, Bootstrap, 
                        Postgres, SQL Alchemy,  Chart.js, D3, Beautiful Soup 
                    </h6>
                    <h6>
                        <u>Disclaimer</u><br />
                        The approximations of the tone analyzer are not perfect. 
                        Aditionally, the website pulls in a small number of 
                        articles from a source, and is therefore only meant 
                        to be a snapshot of the source and not entirely 
                        representative of all their work.
                    </h6>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <div className="row tone-table">
                    <div className="col" id="tone-table">
                        <SimpleTable/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col table-header">
                    <h6>The 
                        <a href="https://cloud.ibm.com/apidocs/tone-analyzer" 
                            target="_blank"
                            > IBM Watson Tone Analyzer </a>
                            describes the tones returned from the linguistics 
                            analysis with the following definitions.
                            Each tone is returned with a score 
                            that ranges between 0-1. 
                            The closer to 1, the more dominant the score. 
                            All scores below 0.5 are excluded. 
                            Additionally, each tone is independent of one-another, 
                            and therefore, an article can have multiple 
                            emotional and language tones.
                    </h6>
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
