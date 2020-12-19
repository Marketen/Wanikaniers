import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Register from "./Register"
import "./App.css";

class Search extends Component {
    state = {symptoms: null}

    searchPatient = async (CIP) => {
        let symptoms_array = await this.props.utils.contract.methods.getSymptomsfromCIP(CIP).call({ from: this.props.utils.publicKey });
        let symptoms_string = symptoms_array.toString();
        console.log("sintomas" + symptoms_string);
        this.setState({symptoms: symptoms_string});
    }

    render() {
        let output;
        if (this.state.symptoms != null) {
            output =
            <div>
                {this.state.symptoms}
            </div>
        }
        return (
            <div className="form, center">
                <br/><br/><br/><br/>search by CIP 
                <input type="text" id="CIP"></input><br></br>
                <button onClick={() => this.searchPatient(document.getElementById('CIP').value)}>SUBMIT</button>
            <div>{output}</div>
            </div>
        )
    }
}

export default Search;