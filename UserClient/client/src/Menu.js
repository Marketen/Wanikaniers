import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import "./App.css";
class Menu extends Component {
    state = {enviado: null}

    render() {
        let output;
        if (this.state.enviado == null) {
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
            </div>

        }
        return(
            <div>
                <br></br><br></br>
                <div className = "upperText">
                Logueado con la cuenta: {this.props.cuenta}
                </div>
            <div>{output}</div>
            </div>
        )
    }
}

export default Menu;
