"use-strict";
import React, {Component} from "react";
import ReactDOM from 'react-dom';
import Toolbar from "./toolbar.jsx";
import ToneForm from './tone_form.jsx';
import SourceForm from './source_form.jsx';
import SideBar from "./sidebar.jsx"
import Backdrop from "./backdrop.jsx"

class App extends Component {

    state = {
        sideBarOpen: false
    };

    sideBarToggleClickHandler = () => {
        this.setState((prevState) => {
            return {
                sideBarOpen: !prevState.sideBarOpen
            };
        });
    };

    backdropClickHandler = () => {
        this.setState({sideBarOpen: false});
    };
    
    render() {
        let backdrop;
        if (this.state.sideBarOpen) {
            backdrop = <Backdrop click={this.backdropClickHandler}/>;
        }
        return (
            <div style={{height: '100%'}}>
                <Toolbar sideBarClickHandler={this.sideBarToggleClickHandler}/>
                <SideBar show={this.state.sideBarOpen}/>
                {backdrop}
                <main style={{marginTop: '64px'}}>
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
                </main>
            </div>
        )
    }
}

ReactDOM.render(
  
    <div id="homepage">
        <App />
    </div>,
  document.getElementById('root')
);

       