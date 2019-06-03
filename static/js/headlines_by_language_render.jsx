"use strict";
import React, {Component} from "react";
import ReactDOM from 'react-dom';
import App from './homepage.jsx';
import News from "./news.jsx";
import Heading from './heading.jsx';
import DropdownMenu from './dropdown.jsx';

const content = (
    <div className="container-fluid">
        <div className="row">
            <div className="col">
                <div className='heading'>
                    <Heading heading='/session-language.json'/>
                </div>
            </div>
            <div className="col">
                <DropdownMenu fetch_url='/get-category-dropdown-list.json'
                                post_url='/get-chosen-category-from-dropdown'
                                filter_by='Filter by Category'/>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <div id="language-headlines">
                    <News fetch_url='/headlines-by-language.json'/>
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