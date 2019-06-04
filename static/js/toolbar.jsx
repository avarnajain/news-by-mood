import React, {Component} from "react";
import '../css/toolbar.css';
import SidebarToggleButton from './sidebar_toggle.jsx'
import DropdownItems from './dropdownItems.jsx';
const toolbar = props => (
  <header className="toolbar">
    <nav className="toolbar__navigation"> 
      <div className="toolbar__toggle-button"> 
        <SidebarToggleButton click={props.sideBarClickHandler}/>
      </div>
      <div className="toolbar__logo"> 
        <a href="/">News By Mood</a>
      </div>
      <div className="spacer"/>
      <div className="toolbar__navigation-items">
        <ul>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              By Emotion
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <DropdownItems fetch_url='/emotional-tones.json'
                              post_url='/get-chosen-emotion'
                              redirect='/headlines-by-emotion'
                              filter_by='tone'/>
            </div>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              By Language
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <DropdownItems fetch_url='/language-tones.json'
                              post_url='/get-chosen-language'
                              redirect='/headlines-by-language'
                              filter_by='tone'/>
            </div>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              By Category
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <DropdownItems fetch_url='/all-categories.json'
                              post_url='/get-chosen-category'
                              redirect='/headlines-by-category'
                              filter_by='category'/>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </header>
);
   
export default toolbar;

