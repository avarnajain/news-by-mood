import React from "react";
import '../css/backdrop.css'

const backdrop = props => (
    <div className="backdrop" onClick={props.click}/>
);

export default backdrop;