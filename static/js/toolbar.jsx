import React, {Component} from "react";
// import ReactDOM from "react-dom";
// import Sidebar from "react-sidebar";
// import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav'
import '../css/toolbar.css';
import SidebarToggleButton from './sidebar_toggle.jsx'

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
          <li> 
            <a href="/get-chosen-emotion/anger">By Emotion</a> 
          </li>
          <li> 
            <a href="/get-chosen-language">By Language</a> 
          </li>
        </ul>
      </div>
    </nav>
  </header>
);
   
export default toolbar;

