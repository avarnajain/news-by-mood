import React from "react";
import '../css/sidebar.css';
import ToneForm from './tone_form.jsx';
import SourceForm from './source_form.jsx';
import CategoryForm from './category_form.jsx';
import {POPOVER_BODY} from './constants.jsx';
import PopoverButton from './popover_button.jsx';
import HomepageDropdownMenu from './homepage_source_dropdown.jsx';

const SideBar = props => {

    let sideBarClasses = 'side-bar';
    if (props.show) {
        sideBarClasses = 'side-bar open';
    }

    return (
        <nav className={sideBarClasses}>
            <ul className='sidebar_content'>
                <a href="/">Home</a>
                <a href="/about">About</a>
                <a href="/todays-headlines">This Just In</a>
                <h3>Source Personality</h3>
                <SourceForm fetch_url='/all-sources.json' 
                            post_url='/get-chosen-source'/>
                <h3>Get News By Emotion</h3>
                <ToneForm fetch_url='/emotional-tones.json' 
                          post_url='/get-chosen-emotion'
                          redirect='/headlines-by-emotion'/>    
                <h3>Get News By Opinion</h3>
                <ToneForm fetch_url='/language-tones.json' 
                          post_url='/get-chosen-language'
                          redirect='/headlines-by-language'/>
                <h3>Get News By Category</h3>
                <CategoryForm fetch_url='/all-categories.json'
                              post_url='/get-chosen-category'
                              redirect='/headlines-by-category'/>
            </ul>
        </nav>
    );
};

export default SideBar;





