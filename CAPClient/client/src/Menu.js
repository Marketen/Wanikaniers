import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Register from "./Register"
import Search from "./Search"
import List from "./List"
import emailjs from "emailjs-com";


import "./App.css";
class Menu extends Component {
    state = { enviado: null }

    componentDidMount = () => {
        this.props.utils.contract.events.patientWithFeverFound()
            .on('data', async (event) => {
                console.log(event.returnValues);
                this.sendFeverMail(event.returnValues);
            })
            .on('error', console.error);
    }

    checkForInactivePatients = () =>{
        let allPatients = await this.props.utils.contract.methods.getAllPatientsFromCAP().call({from: this.props.utils.publicKey})

        inactivePatients = []
        allPatients.forEach(patient => {
            if (Date().now - patient.lastCheck*1000 > 86400000) inactivePatients.push(patient)
            //send patients mail TODO
        })
    }

    sendFeverMail = (patient) => {
        emailjs.init("user_qaiPkK1fjsSPioc5W63I7");
        emailjs.send(
            'service_ese7bjv', 'template_8ygocyr',
            {
                CIP: patient.CIP,
                fever: patient.fever / 100,
                email: patient.email
            }
        ).then(res => {
            console.log('Email successfully sent!')
        })
            // Handle errors here however you like, or use a React error boundary
            .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))

    }


    render() {
        let output;
        console.log(this.props);


        return (
            <Router>
                <Route>
                    <div className="topnav">
                        <Link to="/">WaniTracking</Link>
                        <Link to="/register">Register</Link>
                        <Link to="/search">Search Patient</Link>
                        <Link to="/list">List all Patients</Link>

                    </div>
                </Route>
                <Route path="/register" render={() => (
                    <Register utils={this.props.utils} />
                )} />
                <Route path="/search" render={() => (
                    <Search utils={this.props.utils} />
                )} />
                <Route path="/list" render={() => (
                    <List utils={this.props.utils} />
                )} />
                <Route exact={true} path="/" render={() => (
                    <div>WaniTracking</div>
                )} />

                {/* <br></br><br></br>
                <div className="upperText"></div>
                MENU */}
            </Router>
        )
    }
}


export default Menu;
