import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Register from "./Register"
import "./App.css";

class List extends Component {
    state = {click: 0}

    searchAllPatients = async () => {

    }


    render() {
        let output;
        if (this.state.click == 0) {
            output =
            <div>
                <button onClick={() => this.searchAllPatients()}>SEARCH</button>
            </div>
        }
        else {
            output =
            <div></div>
        }
        return (
            <div div className="form, center">
                <br/><br/><br/><br/>
                <div>Search all Patients</div>
                <br/>
                {output}
            </div>
        )
    }
}

export default List;
