"use-strict";
import React from 'react';
import ReactDOM from 'react-dom';
import MetisMenu from 'react-metismenu';
import ToneForm from './tone_form.jsx';
import SourceForm from './source_form.jsx';

const content=[
    {
        icon: 'icon-class-name',
        label: 'Choose Mood',
        content: [
            {
                icon: 'icon-class-name',
                label: 'Anger',
                to: '/get-chosen-source/anger',
            },
            {
                icon: 'icon-class-name',
                label: 'Sadness',
                to: '/get-chosen-source/sadness',
            },
            {
                icon: 'icon-class-name',
                label: 'Joy',
                to: '/get-chosen-source/joy',
            },
            {
                icon: 'icon-class-name',
                label: 'Fear',
                to: '/get-chosen-source/fear',
            },
        ],
    },
    {
        icon: 'icon-class-name',
        label: 'Source',
        to: '/get-chosen-source/Fox News',
    }
];

ReactDOM.render(
  
  <div id="homepage">
        <MetisMenu content={content} activeLinkFromLocation />
        <ToneForm header="NEWS BY MOOD"
                  fetch_url='/emotional-tones.json' 
                  post_url='/get-chosen-emotion'
                  redirect='/headlines-by-emotion'/>
        <br/>
        <ToneForm header="NEWS BY WRITING STYLE"
                  fetch_url='/language-tones.json' 
                  post_url='/get-chosen-language'
                  redirect='/headlines-by-language'/>
        <br/>
        <SourceForm heading="SOURCE STATISTICS"
                    fetch_url='/all-sources.json' 
                    post_url='/get-chosen-source'/>
    </div>,
  document.getElementById('root')
);