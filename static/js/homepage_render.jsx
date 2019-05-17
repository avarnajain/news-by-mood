"use strict";

ReactDOM.render(

    //What you want to render + a comma
    <div id="homepage">
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
    //where you want to render it + a comma
    document.getElementById("root"),
);