"use strict";

ReactDOM.render(
    //What you want to render + a comma
    <div id="language-headlines">
        <News fetch_url='/headlines-by-language.json'
              fetch_tone='/session-language.json'/>
    </div>,
    //where you want to render it + a comma
    document.getElementById("root"),
);