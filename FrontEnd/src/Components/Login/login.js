import React, { Component } from "react";
import "./Login.scss";
import Logo from "./logos/logo.png";
import axios from "axios";
import { Redirect } from "react-router-dom";
class login extends Component {
  constructor() {
    super();
    this.state = {
      authlogin: "http://etwist.test/api/auth/login?",
      redirect: "http://localhost:3000/register",
      fireRedirect: false,
      remember: false
    };
    }

    componentDidMount(){
      this.isUserAuth();
    }

    //Si el token existe, redirija al home
    isUserAuth =() => {
      var redirection = localStorage.getItem("userIsAuthToken");
      if(redirection !== null){
        this.props.history.push('/home')
      }
    }

  //Este metodo establece si el usuario quiere ser recordado
  remember = (event) => {
    if(this.state.remember === false){
      this.setState({remember : true});
    }
    else{
      this.setState({remember : false});
    }
  }

  //Metodo para registrar un usuario nuevo
  submitUser = (event) => {
    event.preventDefault();
    let user = {
      email: event.target[0].value,
      password: event.target[1].value,
      remember_me: this.state.remember,
    };
    let options = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Requested-With": "XMLHttpRequest",
      },
    };
    axios
      .post(this.state.authlogin, user, { headers: options })
      .then((response) => {
          localStorage.setItem("userIsAuthToken", response.data.token_type +" "+ response.data.access_token);

          this.setState({fireRedirect : true});
      })
      .catch((error) => {
        alert("Error en el usuario o contraseña, por favor intente de nuevo");
      });
  };

  render() {
    const { fireRedirect } = this.state;
    const { from } = this.props.location.state || "/";
    return (
      <div className="Register">
        <img className="logo" src={Logo} alt="logo"></img>
        <div className="form">
          <h2 className="title">Inicio de sesión</h2>
          <hr></hr>
          <form
            className="form2"
            onSubmit={this.submitUser}
          >
            <label htmlFor="Correo">Correo:</label>
            <input
              type="email"
              name="Correo"
              placeholder="Escriba su correo"
              required
              autoComplete="off"
            />
            <label htmlFor="Contrasena">Contraseña:</label>
            <input
              type="password"
              name="Contrasena"
              placeholder="Escriba su contraseña"
              required
              autoComplete="off"
            />
            <label htmlFor="remember_me">Recuerdame</label>
            <input type="checkbox" name="remember_me" onChange={this.remember}></input>
            <br></br>
            <a href="/register">No tiene una cuenta? Regístrese</a>
            <input type="submit" value="Iniciar Sesión" />
            {fireRedirect && <Redirect to={from || "/home"} />}
          </form>
        </div>
      </div>
    );
  }
}
export default login;
