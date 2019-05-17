"use strict";

ReactDOM.render(
    //What you want to render + a comma
    <div id="emotional-headlines">
        <News fetch_url='/headlines-by-emotion.json'
              fetch_tone='/session-emotion.json'/>
    </div>,
    //where you want to render it + a comma
    document.getElementById("root"),
);