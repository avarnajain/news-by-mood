import React from "react";
import '../css/sidebar.css';
import ToneForm from './tone_form.jsx';
import SourceForm from './source_form.jsx';
import CategoryForm from './category_form.jsx';
import {POPOVER_BODY} from './constants.jsx';
import PopoverButton from './popover_button.jsx';

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
                <a href="/todays-headlines">The World Today</a>
                <h3>What is this news source's personality?</h3>
                <SourceForm fetch_url='/all-sources.json' 
                            post_url='/get-chosen-source'/>
                <h3>What mood are you in?</h3>
                <PopoverButton
                    session='/session-emotion.json' 
                    tone='Anger'
                    type='emotion'
                    body={POPOVER_BODY['anger']}/>
                <PopoverButton
                    session='/session-emotion.json' 
                    tone='Fear'
                    type='emotion'
                    body={POPOVER_BODY['fear']}/>
                <PopoverButton 
                    session='/session-emotion.json' 
                    tone='Joy'
                    type='emotion'
                    body={POPOVER_BODY['joy']}/>
                <PopoverButton 
                    session='/session-emotion.json' 
                    tone='Sadness'
                    type='emotion'
                    body={POPOVER_BODY['sadness']}/>
                <PopoverButton 
                    session='/session-emotion.json' 
                    tone='Analytical'
                    type='language'
                    body={POPOVER_BODY['analytical']}/>
                <PopoverButton 
                    session='/session-emotion.json' 
                    tone='Confident'
                    type='language'
                    body={POPOVER_BODY['confident']}/>
                <PopoverButton 
                    session='/session-emotion.json' 
                    tone='Tentative'
                    type='language'
                    body={POPOVER_BODY['tentative']}/>
                <h3>What type of news do you want?</h3>
                <CategoryForm fetch_url='/all-categories.json'
                              post_url='/get-chosen-category'
                              redirect='/headlines-by-category'/>
            </ul>
        </nav>
    );
};

export default SideBar;


// <h3>How do you want your news to make you feel?</h3>
// <ToneForm fetch_url='/emotional-tones.json' 
//           post_url='/get-chosen-emotion'
//           redirect='/headlines-by-emotion'/>    
// <h3>What writing style do you want your news to convey?</h3>
// <ToneForm fetch_url='/language-tones.json' 
//           post_url='/get-chosen-language'
//           redirect='/headlines-by-language'/>


