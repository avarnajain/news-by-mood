"use-strict";

import React from "react";
import Toolbar from "./toolbar.jsx";
import ToneForm from './tone_form.jsx';
import SourceForm from './source_form.jsx';
import SideBar from "./sidebar.jsx"
import Backdrop from "./backdrop.jsx"

class App extends React.Component {

    state = {
        sideBarOpen: false,
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
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <SideBar show={this.state.sideBarOpen}/>
                            {backdrop}
                        </div>
                    </div>
                </div>
                <main style={{marginTop: '64px'}}>
                    <h1> {this.props.content} </h1>
                </main>
            </div>
        )
    }
}

export default App;