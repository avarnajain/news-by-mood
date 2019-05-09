"use strict";

ReactDOM.render(

    //What you want to render + a comma
    <div id="homepage">
        <h1> NEWS BY MOOD </h1>
        <ToneForm fetch_url='/emotional_tones.json' 
                  post_url='/headlines-by-emotion'
                  question='I want news that invokes the following emotion:'/>
        <br/>
        <h1> NEWS BY WRITING STYLE </h1>
        <ToneForm fetch_url='/language_tones.json' 
                  post_url='/headlines-by-language'
                  question='I want news reported in the following writing style:'/>
        <br/>
        <h1> SOURCE STATISTICS </h1>
        <SourceForm fetch_url='/all_sources.json' 
                    post_url='/source-stats'
                    question='What type of articles does this source produce?'/>
    </div>,
    //where you want to render it + a comma
    document.getElementById("root"),
);