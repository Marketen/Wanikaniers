import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Register from "./Register"

import "./App.css";
class Menu extends Component {
    state = { enviado: null }

    render() {
        let output;
        console.log(this.props);


        return (
            <Router>
                <Route>
                    <div className="topnav">
                        <Link to="/">Menu</Link>
                        <Link to="/register">Register</Link>
                    </div>
                </Route>
                <Route path="/register" render={() => (
                    <Register utils={this.props.utils} />
                )} />
                <Route exact={true} path="/" render={() => (
                    <div>menu</div>
                )} />
                
                {/* <br></br><br></br>
                <div className="upperText"></div>
                MENU */}
            </Router>
        )
    }
}


export default Menu;
