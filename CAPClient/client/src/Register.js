import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import emailjs from "emailjs-com";

import "./App.css";
class Register extends Component {
    state = { pendingConfirm: null, CIP:null, email:null, patientPublicKey:null, patientPrivateKey:null, errorMsg:null }

    componentDidMount = () => {
        this.props.utils.contract.events.patientRegistered()
            .on('data', async (event) => {
                console.log(event.returnValues);
                this.confirmRegisteredPatient(event.returnValues);
            })
            .on('error', console.error);
    }

    sendMail = () => {
        emailjs.init("user_qaiPkK1fjsSPioc5W63I7");
        emailjs.send(
          'service_ese7bjv', 'template_tcf188f',
          {
            message: "public key: " + this.state.patientPublicKey + "\nprivate key: " + this.state.patientPrivateKey,
            from_name: "wanikaniers",
            to_email: this.state.email
          }
        ).then(res => {
          console.log('Email successfully sent!')
        })
          // Handle errors here however you like, or use a React error boundary
          .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
    
      }

    confirmRegisteredPatient = (eventParams) => {
        if (eventParams[0] == this.state.CIP && eventParams[1] == this.state.email) {
            this.sendMail()
            this.setState({ pendingConfirm: false })
          }
    }

    registerPatient = async (CIP, email) => {
        let searchPatient = await this.props.utils.contract.methods.getPatientfromCIP(CIP).call({from: this.props.utils.publicKey})
        console.log(searchPatient);
        if (searchPatient.exists) {
            this.setState({errorMsg:"The patient was already registered."})
            return;
        }

        let keys = this.props.utils.web3.eth.accounts.create();
        const gasEstimate = await this.props.utils.contract.methods.registerPatient(keys.address, CIP, email).estimateGas({ from: this.props.utils.publicKey });

        const tx = {
            // this could be provider.addresses[0] if it exists
            from: this.props.utils.publicKey,
            // target address, this could be a smart contract address
            to: "0xdEA06AA5BF529f85E34cdFC78B4Ad181BddeF0C0",
            // this encodes the ABI of the method and the arguements
            data: this.props.utils.contract.methods.registerPatient(keys.address, CIP, email).encodeABI(),
            gasPrice: 0,
            gas: gasEstimate
        };

        const signPromise = this.props.utils.web3.eth.accounts.signTransaction(tx, this.props.utils.privateKey);

        signPromise.then((signedTx) => {
            // raw transaction string may be available in .raw or 
            // .rawTransaction depending on which signTransaction
            // function was called
            const sentTx = this.props.utils.web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);
            sentTx.on("receipt", receipt => {
                console.log("contract call ok")
                console.log(receipt);
            });
            sentTx.on("error", err => {
                console.log("failed contract call")
                console.log(err)
            });
        }).catch((err) => {
            // do something when promise fails
            console.log(err)
        });

        this.setState({ pendingConfirm: true, CIP:CIP, email:email, patientPublicKey:keys.address, patientPrivateKey:keys.privateKey })
    }


    render() {
        let output;
        if (this.state.errorMsg != null) output = <div>{this.state.errorMsg}</div>
        else if (this.state.pendingConfirm == null) {
            output = <div className ="center">
                <h1>Register a patient</h1>
            CIP<br></br>
                <input type="text" id="CIP"></input><br></br>
            Email<br></br>
                <input type="text" id="email"></input><br></br>
                <button onClick={() => this.registerPatient(
                    document.getElementById('CIP').value,
                    document.getElementById('email').value
                )}>SUBMIT</button>

            </div>
        }
        else if (this.state.pendingConfirm == true) {
            output = <div>
                Waiting for confirmation...
            </div>
        }

        else{
            output = <div>
                Registered successfully.
            </div>
        }

        return (
            <div>{output}</div>
        )
    }
}


export default Register;
