"use strict";
import React, {Component} from "react";
import ReactDOM from 'react-dom';
import App from './homepage.jsx';
import News from "./news.jsx";


const content = (
    <div id="emotional-headlines">
        <News fetch_url='/headlines-by-emotion.json'
              fetch_tone='/session-emotion.json'/>
    </div>
);

ReactDOM.render(
  
    <div id="homepage">
        <App content={content}/>
    </div>,
  document.getElementById('root')
);
