import React from "react";
import '../css/sidebar.css';
import ToneForm from './tone_form.jsx';
import SourceForm from './source_form.jsx';

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
                <ToneForm fetch_url='/emotional-tones.json' 
                          post_url='/get-chosen-emotion'
                          redirect='/headlines-by-emotion'/>    
                <br />
                <h3>By Language</h3>
                <ToneForm fetch_url='/language-tones.json' 
                          post_url='/get-chosen-language'
                          redirect='/headlines-by-language'/>
                <br />
                <h3><a href='/'>Source Statistics</a></h3>
                <SourceForm fetch_url='/all-sources.json' 
                            post_url='/get-chosen-source'/>
            </ul>
        </nav>
    );
};

export default SideBar;

