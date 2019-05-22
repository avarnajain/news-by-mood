"use-strict";
import React, {Component} from "react";
import ReactDOM from 'react-dom';
import App from './homepage.jsx';
import News from './news.jsx';

const content = (
    <div>
        <h4> Home </h4>
        <div id="top-headlines">
            <News fetch_url='/top-headlines.json'/>
        </div>
    </div>
);

ReactDOM.render(
  
    <div id="homepage">
        <App content={content}/>
    </div>,
  document.getElementById('root')
);




       