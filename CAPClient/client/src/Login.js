import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import "./App.css";
class Login extends Component {
    state = {response: null, clicked: 3}

    componentDidMount = () =>{
        this.setState({response: null, clicked: 4});
    }


    render() {
        let output;
        console.log(this.props);
    
        
        return(

                <Router>
                    <Route>
                    <div className="topnav">
                         <Link to="/">Menu</Link>
                     </div>
                    </Route>
                <br></br><br></br>
                <div className = "upperText"></div>
                LOGIN
                {output}
                </Router>
        )
    }
}
    

export default Login;
