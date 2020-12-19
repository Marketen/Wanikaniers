import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";
import Menu from "./Menu"
import { BrowserRouter as Router, Link, Route } from "react-router-dom";


import "./App.css";

class App extends Component {
  state = {web3: null, publicKey: null, privateKey:null};

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      if (web3 == null) return;
      
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      console.log("accounts" + accounts);
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      console.log("network id:" + networkId);
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  setCuenta = async (cuenta, privateKey) => {
    console.log("HEY")
    let response = await this.state.contract.methods.patientExists().call({ from: cuenta });
    console.log(response)
    //const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    //await contract.methods.set(5).send({from: accounts[0x1C831Ddc3c974E11be1BD129c563914dE34576E1]});

    // Get the value from the contract to prove it worked.

    // Update state with the result.
    if(response == true){
      this.setState({publicKey: cuenta, privateKey:privateKey});
    }
  };

  render() {
    let output;

    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    else if (this.state.publicKey==null) {
      output = <div className="center">
        <h1> BIENVENIDO </h1>
        <br></br>Ingresa tu clave pública<br></br>
        <input type="text" id="cuenta"></input>
        <br></br>Ingresa tu clave privada<br></br>
        <input type="text" id="privateKey"></input><br/>
        <button onClick={() => this.setCuenta(document.getElementById('cuenta').value, document.getElementById('privateKey').value)}>Entrar</button>
      </div>
    }

    else {
      {console.log(this.state.publicKey)}
      output = <Menu utils = {this.state}> </Menu>
    }
    return (
      <div>
        <Router>
         <div className="topnav">
                    <Link to="/">COVID-19 Tracking</Link>
                </div>
        </Router>
        {output}
        </div>
    );
  }
}

export default App;
