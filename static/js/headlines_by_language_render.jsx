"use strict";
import React, {Component} from "react";
import ReactDOM from 'react-dom';
import App from './homepage.jsx';
import News from "./news.jsx";
import Heading from './heading.jsx';


const content = (
    <div id="language-headlines">
        <div className='heading'>
            <Heading heading='/session-language.json'/>
        </div>
        <News fetch_url='/headlines-by-language.json'/>
    </div>
);

ReactDOM.render(
  
    <div id="homepage">
        <App content={content}/>
    </div>,
  document.getElementById('root')
);