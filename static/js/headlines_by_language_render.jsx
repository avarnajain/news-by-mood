"use strict";

ReactDOM.render(
    //What you want to render + a comma
    <div id="language-headlines">
        <ChosenTone fetch_url='/session-language.json'/>
        <News fetch_url='/headlines-by-language.json'/>
    </div>,
    //where you want to render it + a comma
    document.getElementById("root"),
);