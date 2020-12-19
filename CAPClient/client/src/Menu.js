import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import "./App.css";
class Menu extends Component {
    state = {enviado: null}

    render() {
        let output;
        console.log(this.props);
    
        
        return(
            <Router>
                    <Route>
                     <div className="topnav">
                         <Link to="/">Menu</Link>
                        <Link to="/logout">Logout</Link>
                     </div>
                    </Route>
                <br></br><br></br>
                <div className = "upperText"></div>
                MENU
                {output}
                </Router>
        )
    }
}
    

export default Menu;
