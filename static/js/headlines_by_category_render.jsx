"use strict";
import React, {Component} from "react";
import ReactDOM from 'react-dom';
import App from './homepage.jsx';
import CatNews from "./category_news.jsx";


const content = (
    <div id="category-headlines">
        <CatNews fetch_url='/headlines-by-category.json'/>
    </div>
);

ReactDOM.render(
  
    <div id="homepage">
        <App content={content}/>
    </div>,
  document.getElementById('root')
);
