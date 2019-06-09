"use strict";
import React, {Component} from "react";
import ReactDOM from 'react-dom';
import App from './homepage.jsx';
// import News from "./news.jsx";
// import Heading from './heading.jsx';
import DropdownMenu from './dropdownMenu.jsx';
// import '../css/headlines.css';
import PopoverButton from './popover_button.jsx'
import CircleButton from './circle_button_list.jsx';
import News from './news.jsx';
import {POPOVER_BODY} from './constants.jsx';

const content = (
    <div className="container-fluid">
        <div className="row">
            <div className="col">
                <div id="individual-article">
                    <News fetch_url='/article.json'/>
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
