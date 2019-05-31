import React from "react";
import '../css/sidebar.css';
import ToneForm from './tone_form.jsx';
import SourceForm from './source_form.jsx';
import CategoryForm from './category_form.jsx';

const SideBar = props => {

    let sideBarClasses = 'side-bar';
    if (props.show) {
        sideBarClasses = 'side-bar open';
    }

    return (
        <nav className={sideBarClasses}>
            <ul className='sidebar_content'>
                <h3>What type of news do you want?</h3>
                <CategoryForm fetch_url='/all-categories.json'
                              post_url='/get-chosen-category'
                              redirect='/headlines-by-category'/>
                <h3>How do you want your news to make you feel?</h3>
                <ToneForm fetch_url='/emotional-tones.json' 
                          post_url='/get-chosen-emotion'
                          redirect='/headlines-by-emotion'/>    
                <h3>What writing style do you want your news to convey?</h3>
                <ToneForm fetch_url='/language-tones.json' 
                          post_url='/get-chosen-language'
                          redirect='/headlines-by-language'/>
                <h3>What is this news source's personality?</h3>
                <SourceForm fetch_url='/all-sources.json' 
                            post_url='/get-chosen-source'/>
            </ul>
        </nav>
    );
};

export default SideBar;

