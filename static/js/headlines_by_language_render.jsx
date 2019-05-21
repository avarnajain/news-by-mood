"use strict";
import React, {Component} from "react";
import ReactDOM from 'react-dom';
import App from './homepage.jsx';
import News from "./headlines_list.jsx";

const content = (
    <div id="language-headlines">
        <News fetch_url='/headlines-by-language.json'
              fetch_tone='/session-language.json'/>
    </div>
);

ReactDOM.render(
  
    <div id="homepage">
        <App content={content}/>
    </div>,
  document.getElementById('root')
);