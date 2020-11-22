import React, { Component } from "react";
import Navara from "../Home/Others/Navbar";
import "./Usuario.scss";
import axios from "axios";
class Usuario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.location.state.data.user,
      personalData: [],
      estados: [],
      status: "",
      nombreCompleto: "",
      fecha: "",
    };
  }

  componentDidMount() {

    console.log(this.state.user);
    this.getInfo();
    this.getEstado();
  }

  //Este metodo une ciertos strings en la informacion personal
  verificar() {
    if (
      this.state.personalData.Name === "Su nombre" &&
      this.state.personalData.Lastname === "Su apellido" &&
      this.state.personalData.birthdate === ""
    ) {
      this.setState({ nombreCompleto: "No definido" });
      this.setState({ fecha: "No definido" });
    } else {
      this.setState({
        nombreCompleto:
          this.state.personalData.Name + " " + this.state.personalData.Lastname,
      });
      this.setState({ fecha: this.state.personalData.birthdate });
    }
  }

  //Hace un get de todos los estados
  estado() {
    this.state.estados.map((estado) => {
      if (this.state.personalData.idStatus === estado.id) {
        this.setState({ status: estado.situation });
        console.log("Estado: ", this.state.status);
      }
    });
  }

  //Hace un get de la informacion personal de cierto usuario
  getInfo() {
    axios
      .get("http://etwist.test/api/personal/" + this.state.user.id)
      .then((response) => {
        this.setState({ personalData: response.data });
        console.log(response.data);
        this.verificar();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  //Hace un get de todos los status o estados civiles
  getEstado() {
    axios.get("http://etwist.test/api/estadocivil").then((response) => {
      this.setState({ estados: response.data });
      this.estado();
    });
  }

  //Metodo render
  render() {
    return (
      <div>
        <Navara></Navara>
        <div className="container">
          <div className="usuario">
            <label className="seunio">
              El usuario se unió el:{" "}
              {this.state.user.created_at.substring(0, 10)} a las:{" "}
              {this.state.user.created_at.substring(11, 16)}
            </label>
            <h2>Perfil del usuario</h2>

            <img className="profilePic" src={this.state.user.profilePic}></img>
            <h2>Nombre de usuario: {this.state.user.name}</h2>
            <h2>Información de contacto: {this.state.user.email}</h2>
            <hr></hr>
            <h2>Nombre completo: {this.state.nombreCompleto}</h2>
            <h2>Fecha de nacimiento: {this.state.fecha}</h2>
            <h2>Situación sentimental: {this.state.status}</h2>
          </div>
        </div>
      </div>
    );
  }
}
export default Usuario;
