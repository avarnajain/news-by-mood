"use strict";

ReactDOM.render(

    //What you want to render + a comma
    <div id="language-headlines">
        <Source fetch_url='/source-name-stats.json'/>
        <Stats fetch_url='/emotional-source-stats.json'
               heading='Emotional Profile'/>
        <Stats fetch_url='/language-source-stats.json'
               heading='Language Profile'/>
        <Stats fetch_url='/None-source-stats.json'
                heading='No Dominant Tones Detected'/>
    </div>,
    //where you want to render it + a comma
    document.getElementById("root"),
);