import React, {Component} from "react";
import '../css/toolbar.css';
import SidebarToggleButton from './sidebar_toggle.jsx'
import DropdownItems from './dropdownItems.jsx';
import DropdownSources from './dropdownSources.jsx';

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
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              By Emotion
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <DropdownItems fetch_url='/emotional-tones.json'
                              post_url='/get-chosen-emotion'
                              redirect='/headlines-by-emotion'
                              filter_by='tone'/>
            </div>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              By Opinion
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <DropdownItems fetch_url='/language-tones.json'
                              post_url='/get-chosen-language'
                              redirect='/headlines-by-language'
                              filter_by='tone'/>
            </div>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              By Category
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <DropdownItems fetch_url='/all-categories.json'
                              post_url='/get-chosen-category'
                              redirect='/headlines-by-category'
                              filter_by='category'/>
            </div>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Source Statistics
            </a>
            
            <div id='scrollable-dropdown' className="dropdown-menu scrollable-menu" aria-labelledby="navbarDropdownMenuLink">
              <DropdownSources fetch_url='/all-sources.json'
                              post_url='/get-chosen-source'/>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </header>
);
   
export default toolbar;

