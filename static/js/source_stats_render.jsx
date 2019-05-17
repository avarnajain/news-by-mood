"use strict";

ReactDOM.render(

    //What you want to render + a comma
    <div id="language-headlines">
        <Stats fetch_url='/all-source-stats.json'
                  filter_by='source_name'/>
        <Stats fetch_url='/all-source-stats.json'
                  filter_by='emotional'
                  heading='Emotional Tones'/>
        <Stats fetch_url='/all-source-stats.json'
                  filter_by='language'
                  heading='Language Tones'/>
        <Stats fetch_url='/all-source-stats.json'
                filter_by='None'/>
        <Stats fetch_url='/all-source-stats.json'
                filter_by='total'/>
    </div>,
    //where you want to render it + a comma
    document.getElementById("root"),
);