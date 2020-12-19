import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";
import emailjs from "emailjs-com";

import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  sendMail = (pub,priv) => {
    emailjs.init("user_qaiPkK1fjsSPioc5W63I7");
      emailjs.send(
        'service_ese7bjv', 'template_tcf188f',
        {message: "public key: " + pub + "\nprivate key: " +priv,
                from_name: "wanikaniers",
                to_email: "marcfont12@gmail.com"
      }
        ).then(res => {
          console.log('Email successfully sent!')
        })
        // Handle errors here however you like, or use a React error boundary
        .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
      
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    //   console.log("OK")
    //   this.state.contract.events.test({})
    // .on('data', async (event)=>{
    //     console.log(event.returnValues);
    //     let keys = web3.eth.accounts.create();
    //     this.sendMail(keys.address, keys.privateKey)
    //     this.sendMail();
        // Do something here
  //  })
    //.on('error', console.error);
      /*this.state.contract.getPastEvents("allEvents",
    {                               
        fromBlock: 1,     
        toBlock: 'latest' // You can also specify 'latest'          
    })                              
.then(events => console.log(events))
.catch((err) => console.error(err));*/
     
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample2 = async (x) => {
    const { accounts, contract } = this.state;

    if(x==null) x=5
    // Stores a given value, 5 by default.
    await contract.methods.set(x).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    //this.setState({ storageValue: response });
    //console.log(contract.events)
  };

  // runExample = async (x) => {
  //   const { accounts, contract } = this.state;

  //   if(x==null) x=5

  //   //const gasEstimate = await contract.methods.set(x).estimateGas({ from: "0x32DdA88e9c31fb92bCa448528eA4ae0AC9C6A63e" });

  //   const tx = {
  //     // this could be provider.addresses[0] if it exists
  //     from: "0x32DdA88e9c31fb92bCa448528eA4ae0AC9C6A63e", 
  //     // target address, this could be a smart contract address
  //     to: "0x837e55e5cA244BCB94f7C304f4b216eF11813a69", 
  //     // this encodes the ABI of the method and the arguements
  //     data: contract.methods.set(x).encodeABI() ,
  //     gasPrice: 0,
  //    // gas: gasEstimate
  //   };

    // const signPromise = this.state.web3.eth.accounts.signTransaction(tx, "0xae29e1a8ae41b8dd041abab55b05a824a20132721f2a20a244b4811b51e9c100");

    // signPromise.then((signedTx) => {
    //   // raw transaction string may be available in .raw or 
    //   // .rawTransaction depending on which signTransaction
    //   // function was called
    //   const sentTx = this.state.web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);
    //   sentTx.on("receipt", receipt => {
    //     console.log("contract call ok")
    //   });
    //   sentTx.on("error", err => {
    //     console.log("failed contract call")
    //   });
    // }).catch((err) => {
    //   // do something when promise fails
    //   console.log(err)
    // });





    
    // Stores a given value, 5 by default.
    //await contract.methods.set(x).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    //const response = await contract.methods.get().call();

    // Update state with the result.
    //this.setState({ storageValue: response });
    //console.log(contract.events)

  



  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 40</strong> of App.js.
        </p>
        <div>The stored value is: {this.state.storageValue}</div>

        <button onClick={() => this.runExample(this.state.storageValue+1)}>SUBMIT</button>
      </div>
    );
  }
}

export default App;
