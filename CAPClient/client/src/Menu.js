import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import "./App.css";
class Menu extends Component {
    state = {enviado: null}

    render() {
        let output;
        console.log(this.props);
    
        
        return(
            <div>
                <br></br><br></br>
                <div className = "upperText">
                Logueado con la cuenta: {this.props.cuenta}
                </div>
            <div>{output}</div>
            </div>
        )
    }
}
    

export default Menu;
