"use strict";

ReactDOM.render(

    //What you want to render + a comma
    <div id="homepage">
        <h1> NEWS BY MOOD </h1>
        <ToneForm fetch_url='/emotional_tones.json' post_url='/headlines-by-emotion'/>
        <br/>
        <h1> NEWS BY WRITING STYLE </h1>
        <ToneForm fetch_url='/language_tones.json' post_url='/headlines-by-language'/>
    </div>,
    //where you want to render it + a comma
    document.getElementById("root"),

);