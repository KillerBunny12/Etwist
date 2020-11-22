import React, { Component } from "react";
import axios from "axios";
import "./Registro.scss";
import Logo from "./logos/logos.png";

class Registro extends Component {
  constructor() {
    super();
    this.state = {
      authsignup: "http://etwist.test/api/auth/signup",
      fireRedirect : false
    };
  }

  //Método que envía el formulario de registro al back
  submitUser = (event) => {
    event.preventDefault();

    //Se le asignan los parametros a "user"
    let user = {
      name: event.target[0].value,
      email: event.target[1].value,
      password: event.target[2].value,
      password_confirmation: event.target[3].value,
    };

    //Se asignan los headers para el POST
    let options = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Requested-With": "XMLHttpRequest",
      },
    };

    //Con axios se hace la petición POST con todos los datos a registrarse
    axios
      .post(this.state.authsignup, user, { headers: options })
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          console.log("OK!" , response.data);
          this.props.history.push("/");
        }
      })
      .catch((error) => {
        console.log("Fallo:" + error.message);
      });
  };

  //Método render, renderiza el html
  render() {
    return (
      <div>
        <div className="Register">
        <img className="logo" src={Logo} alt="Logo"></img>
        <div className="form">
          <h2 className="title">Registre su cuenta</h2>
          <hr></hr>
          <form
            className="form2"
            onSubmit={this.submitUser}
          >
            <label htmlFor="name">Nombre usuario:</label>
            <input
              type="text"
              name="name"
              placeholder="Escriba un nombre de usuario"
              min="6"
              max="16"
              required
              autoComplete="off"
            ></input>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              name="email"
              placeholder="Escriba su correo"
              autoComplete="off"
            ></input>
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              name="password"
              placeholder="Escriba una contraseña"
              autoComplete="off"
            ></input>

            <label htmlFor="password_confirmation">
              Confirme su contraseña:
            </label>
            <input
              type="password"
              name="password_confirmation"
              placeholder="Confirme su contraseña"
              autoComplete="off"
            ></input>
            <input type="submit" value="Registrarse" />
          </form>
        </div>
      </div>
      </div>
    );
  }
}
export default Registro;