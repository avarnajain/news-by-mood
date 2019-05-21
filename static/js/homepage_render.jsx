"use-strict";
import React, {Component} from "react";
import ReactDOM from 'react-dom';
import App from './homepage.jsx';
import TopNews from "./top_headlines_list.jsx";

const content = (
    <div>
        <h4> Home </h4>
        <div id="top-headlines">
            <TopNews fetch_url='/top-headlines.json'/>
        </div>
    </div>
);

ReactDOM.render(
  
    <div id="homepage">
        <App content={content}/>
    </div>,
  document.getElementById('root')
);




       