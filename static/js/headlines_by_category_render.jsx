"use strict";
import React, {Component} from "react";
import ReactDOM from 'react-dom';
import App from './homepage.jsx';
import News from "./news.jsx";
import Heading from './heading.jsx';


const content = (
    <div id="category-headlines">
        <div className='heading'>
            <Heading heading='/session-category.json'/>
        </div>
        <News fetch_url='/headlines-by-category.json'/>
    </div>
);

ReactDOM.render(
  
    <div id="homepage">
        <App content={content}/>
    </div>,
  document.getElementById('root')
);
