"use strict";
import React, {Component} from "react";
import ReactDOM from 'react-dom';
import App from './homepage.jsx';
import News from "./news.jsx";
import Heading from './heading.jsx';

const content = (
    <div id="emotional-headlines">
        <div className='heading'>
            <Heading heading='/session-emotion.json'/>
        </div>
        <News fetch_url='/headlines-by-emotion.json'/>
    </div>
);

ReactDOM.render(
  
    <div id="homepage">
        <App content={content}/>
    </div>,
  document.getElementById('root')
);
