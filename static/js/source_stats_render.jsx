"use strict";

ReactDOM.render(

    //What you want to render + a comma
    <div id="language-headlines">
        <Source fetch_url='/session-source.json'/>
        <Stats fetch_url='/emotional-source-stats.json'
                filterVal='emotional'
               heading='Emotional Tones'/>
        <Stats fetch_url='/language-source-stats.json'
               heading='Language Tones'/>
        <Total fetch_url='/None-source-stats.json'
                heading="Number of articles with 'No Dominant Tone'"/>
        <Total fetch_url='/number-articles-source.json'
                heading='Total number of articles for source'/>
    </div>,
    //where you want to render it + a comma
    document.getElementById("root"),
);