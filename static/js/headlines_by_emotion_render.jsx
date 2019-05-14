"use strict";

ReactDOM.render(
    //What you want to render + a comma
    <div id="emotional-headlines">
        <ChosenTone fetch_url='/session-emotion.json'/>
        <News fetch_url='/headlines-by-emotion.json'/>
    </div>,
    //where you want to render it + a comma
    document.getElementById("root"),
);