import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Register from "./Register"
import "./App.css";

class List extends Component {
    state = {click: 0, patients: null}

    searchAllPatients = async () => {
        let patients_array = await this.props.utils.contract.methods.getAllPatientsFromCAP().call({ from: this.props.utils.publicKey });
        let arraydef = [];
        for (let i = 0; i < patients_array.length; i++) {
            const symptoms_array = await this.props.utils.contract.methods.getSymptomsfromCIP(patients_array[i].CIP).call({ from: this.props.utils.publicKey });
            console.log(symptoms_array);
            var date = "no data";
            var fever = "no data";
            if (symptoms_array.length > 0) {
                let simp = symptoms_array[symptoms_array.length-1]
                date = new Date((simp.date)*1000);
                date = date.toString();
                fever = simp.fever/100;
            }
            let variable = {
                CIP: patients_array[i].CIP,
                date: date,
                fever: fever,
            }
            arraydef.push(variable);
        }

        this.setState({patients: arraydef});
        


    }

    render() {
        let output;
        if (this.state.patients == null) {
            output =
            <div>
                <button onClick={() => this.searchAllPatients()}>SEARCH</button>
            </div>
        }
        else {
            output = 
            <div>
                 <br/><br/>
                <table className = "table center">
                <tr><td>CIP</td><td>DATE</td><td>TEMPERATURE</td></tr>

                {this.state.patients.map(item => {
                    return <tr><td>{item.CIP}</td><td>{item.date}</td>  <td>{item.fever} </td></tr>
                })}
                </table>
            </div>
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
