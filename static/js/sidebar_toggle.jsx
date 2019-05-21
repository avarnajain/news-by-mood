import React from "react";
import "../css/sidebar_toggle.css";

const SidebarToggleButton = props => (
    <button className="toggle-button" onClick={props.click}>
        <div className="toggle-button__line"/>
        <div className="toggle-button__line"/>
        <div className="toggle-button__line"/>
    </button>
);

export default SidebarToggleButton;