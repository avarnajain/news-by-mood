"use strict";
import React, {Component} from "react";
import ReactDOM from 'react-dom';
import App from './homepage.jsx';
// import PopoverButton from './popover_button.jsx'
import SimpleTable from './tones_table.jsx';
import '../css/about.css';
const content = (
    <div className="container-fluid">
            <div className="row">
                <div className="col heading">
                    <h2 > About </h2>
                </div>
            </div>
            <div className="row">
                <div className="col info-body">
                    <h6>
                    News By Mood was conceptualized as an idea when I heard that people didn’t like reading the news because it was always too upsetting. The goal behind this project was to understand how news articles can elicit specific emotional responses in their readers. 

                    News By Mood pulls in approximately 100 articles a day across various news sources within the United States. A user can can filter these articles by the emotional (anger, fear, joy, sadness) or language (analytical, confident, tentative) tones that are present in them, or by the category of news they want to read. They can also evaluate the “personality profiles” of news sources to see what types of articles the source puts out, across both emotional and language tones. This is an effort to make more clear the subjective and objective tendencies of sources to write articles that make their readers feel a certain way, or how these sources present their data and conclusions (or lack thereof).

                    The articles are pulled in using newsapi.org and scored by the IBM Watson Tone Analyzer (linguistics analysis), which returns a score index for all the dominant tones in the articles. The index ranges between 0-1, the closer to 1, the more dominant the score. Everything below 0.5 is excluded. Each tone is independent of each other, and therefore, an article can have multiple emotional and language tones. 

                    The website also provides a snapshot of how the world is feeling today, by calculating the percentage of news for each kind of tone based on all the articles collected for the day. The source, category, and daily statistics are calculated similarly. The percentages of the tones are weighted by the score for each tone in an article, and divided by the number of total articles.
                    </h6>
                    <h6>
                    Technologies Used
                    News Articles pulled from newsapi.org
                    Sentimental Analysis from IBM Watson Tone Analyzer
                    Python, Javascript, React, AJAX, Webpack, Bootstrap, Postgres, SQL Alchemy,  Chart.js, D3, Beautiful Soup, 
                    </h6>
                    <h6>
                    Future Ideas
                    It would interesting to see how different sources are ranked based on the tones they produce in their articles. I would also like to use multiple APIs to pull news sources, to provide a more well-rounded view of the source’s personality. Additionally, I would like to point out that the approximations of the tone analyzer are not perfect, and as the analyzer improves, it could be really informative to see how different sources cater to specific audience needs.
                    </h6>
                </div>
            </div>
            <div className="row">
                <div className="col heading">
                    <h5>The 
                        <a href="https://cloud.ibm.com/apidocs/tone-analyzer" 
                            target="_blank"
                            > IBM Watson Tone Analyzer </a>
                        describes their linguistic analysis with the following definitions
                    </h5>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <div className="row">
                    <div className="col">
                        <SimpleTable/>
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
