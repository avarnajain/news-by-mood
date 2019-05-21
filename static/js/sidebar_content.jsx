import React from "react";
import '../css/sidebar_content.css'

const SideBar = props => {

    let sideBarClasses = 'side-bar';
    if (props.show) {
        sideBarClasses = 'side-bar open';
    }

    return (
        <nav className={sideBarClasses}>
            <ul>
                <li><a href='/'>By Emotion</a></li>
                <li><a href='/'>By Language</a></li>
            </ul>
        </nav>
    );
};

export default SideBar;
