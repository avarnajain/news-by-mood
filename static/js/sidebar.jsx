import React from "react";
import '../css/sidebar.css'

const SideBar = props => {

    let sideBarClasses = 'side-bar';
    if (props.show) {
        sideBarClasses = 'side-bar open';
    }

    return (
        <nav className={sideBarClasses}>
            <ul>
                <h3><a href='/'>Home</a></h3>
                <br />
                <h3>By Emotion</h3>
                <li><a href='/chosen-emotion-emotion/anger'>Anger</a></li>
                <li><a href='/chosen-emotion-emotion/joy'>Joy</a></li>
                <li><a href='/chosen-emotion-emotion/sadness'>Sadness</a></li>
                <li><a href='/chosen-emotion-emotion/fear'>Fear</a></li>
                <br />
                <h3>By Language </h3>
                <li><a href='/get-chosen-language/analytical'>Analytical</a></li>
                <li><a href='/get-chosen-language/confident'>Confident</a></li>
                <li><a href='/get-chosen-language/tentative'>Tentative</a></li>
                <br />
                <h3><a href='/'>Source Statistics</a></h3>
            </ul>
        </nav>
    );
};

export default SideBar;
