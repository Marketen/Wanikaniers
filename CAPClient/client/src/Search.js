import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Register from "./Register"
import "./App.css";

class Search extends Component {
    state = {symptoms: null}

    searchPatient = async (CIP) => {
        let symptoms_array = await this.props.utils.contract.methods.getSymptomsfromCIP(CIP).call({ from: this.props.utils.publicKey });
        console.log(symptoms_array)

        this.setState({symptoms: symptoms_array});
    }

    render() {
        let output;
        if (this.state.symptoms != null) {
            if(this.state.symptoms.length == 0) output = <div>No ha registrado ningún síntoma.</div>
            else{output =
            <div>
                {this.state.symptoms.map(item => {
                    let date = new Date((item.date)*1000);
                    return <div>{date+" "+item.fever/100} </div>
                })}
            </div>}
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