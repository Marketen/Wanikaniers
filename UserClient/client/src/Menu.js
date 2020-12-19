import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import "./App.css";
class Menu extends Component {
    state = {enviado: null,pendingConfirm: null}

    componentDidMount = () => {
        this.props.utils.contract.events.symptomsAdded()
            .on('data', async (event) => {
                console.log(event.returnValues);
                this.confirmRegisteredSymptoms(event.returnValues);
            })
            .on('error', console.error);
    }

    confirmRegisteredSymptoms = (eventParams) => {
        if (eventParams[0] == this.props.utils.publicKey) {
            this.setState({ pendingConfirm: false })
          }
    }

    registerSymptoms= async (fever) => {
        let f = Math.floor(parseFloat(fever)*100);
        const gasEstimate = await this.props.utils.contract.methods.addSymptoms(f).estimateGas({ from: this.props.utils.publicKey });

        const tx = {
            // this could be provider.addresses[0] if it exists
            from: this.props.utils.publicKey,
            // target address, this could be a smart contract address
            to: "0x3b088A972E892d956642c03c1750C9fe1Df628Aa",
            // this encodes the ABI of the method and the arguements
            data: this.props.utils.contract.methods.addSymptoms(f).encodeABI(),
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

        this.setState({ pendingConfirm: true })
    }

    render() {
        let output;
        if (this.state.pendingConfirm == null) {
            output = 
            <div className = "center, form">
                <form>
                    <fieldset id = "pregunta1" className ="form-camp">
                         Tos seca<input type ="radio" id="pregunta1y" name ="preg1"></input> Si  <input type ="radio" id="pregunta1n"  name ="preg1"></input> No 
                    </fieldset>
                    <fieldset id = "pregunta2" className ="form-camp">
                        Temperatura corporal <input type="number" id="quantity" name="quantity" min="35" max="42"></input>
                    </fieldset>
                    <fieldset id = "pregunta3" className ="form-camp">
                       Dolor de garganta <input type ="radio" id="pregunta1y" name ="preg3"></input> Si  <input type ="radio" id="pregunta1n"  name ="preg3"></input> No 
                    </fieldset>
                    <fieldset id = "pregunta4" className ="form-camp">
                       Dolor de cabeza <input type ="radio" id="pregunta1y" name ="preg3"></input> Si  <input type ="radio" id="pregunta1n"  name ="preg3"></input> No 
                    </fieldset>
                    <fieldset id = "pregunta5" className ="form-camp">
                       Dificultad para respirar o sensación de falta de aire <input type ="radio" id="pregunta1y" name ="preg3"></input> Si  <input type ="radio" id="pregunta1n"  name ="preg3"></input> No 
                    </fieldset>
                    <fieldset id = "pregunta6" className ="form-camp">
                       Dolor o presión en el pecho <input type ="radio" id="pregunta1y" name ="preg3"></input> Si  <input type ="radio" id="pregunta1n"  name ="preg3"></input> No 
                    </fieldset>
                    <fieldset id = "pregunta7" className ="form-camp">
                    Erupciones cutáneas o pérdida del color en los dedos de las manos o de los pies <input type ="radio" id="pregunta1y" name ="preg3"></input> Si  <input type ="radio" id="pregunta1n"  name ="preg3"></input> No 
                    </fieldset>
                    <fieldset id = "pregunta8" className ="form-camp"> 
                        Nivell Cansancio 
                        <input list="cansancio"></input>
                        <datalist id = "cansancio">
                            <option value = "Elevado"></option>
                            <option value = "Moderado"></option>
                            <option value = "Leve"></option>
                            <option value = "Insignificante"></option>
                        </datalist>
                    </fieldset>
                    <fieldset id = "pregunta9" className ="form-camp"> 
                        Perdida del sentido del olfato o del gusto 
                        <input list="sentidos"></input>
                        <datalist id = "sentidos">
                            <option value = "Elevado"></option>
                            <option value = "Moderado"></option>
                            <option value = "Leve"></option>
                            <option value = "Insignificante"></option>
                        </datalist>
                    </fieldset>



                </form>
                <button onClick={() => this.registerSymptoms(
                    document.getElementById('quantity').value
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
                Registered symptoms successfully.
            </div>
        }

        return(
            <div>
                <br></br><br></br>
                <div className = "upperText">
                
                </div>
            <div>{output}</div>
            </div>
        )
    }
}

export default Menu;
