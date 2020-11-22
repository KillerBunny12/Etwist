import Navara from "./Others/Navbar";
import Menu from "./Others/Menu";
import React, { Component } from "react";
import axios from "axios";
import "./post.scss";
import Timeline from "./Others/Timeline";

class home extends Component {
  constructor() {
    super();
    this.state = {
      domainUser: "http://etwist.test/api/auth/user",
      domainLogout: "http://etwist.test/api/auth/logout",
      image: null,
      UserToken: localStorage.getItem("userIsAuthToken"),
      user: [],
      search: [],
      personalData: [],
      photoData: [],
    };
  }


  componentDidMount(){
    this.protectionComponent();
  }


  //Metodo para retornar al login en caso de que el
  //token no exista
  protectionComponent() {
    if (this.state.UserToken === null) {
      this.props.history.push("/");
    }
  }

  //Metodo para buscar
  search = (event) => {
    event.preventDefault();
    let search = {
      name: event.target[0].value,
    };
    axios
      .post("http://etwist.test/api/auth/search", search)
      .then((response) => {
        sessionStorage.setItem("searchData", JSON.stringify(response.data));
        console.log("Busqueda: ", sessionStorage.getItem("searchData"));
        this.props.history.push("/search");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Metodo para desloguearse
  LogOut = (event) => {
    let options = {
      headers: {
        Authorization: this.state.UserToken,
      },
    };
    axios.get(this.state.domainLogout, options).then((response) => {
      localStorage.removeItem("userIsAuthToken");
      this.props.history.push("/");
    });
  };

  render() {
    return (
      <div>
        <Navara></Navara>
        <div className="container">
          <form className="busquedahome" onSubmit={this.search}>
            <input
              type="text"
              placeholder="Escriba un nombre de usuario para buscar"
              id="barrabusqueda"
              autoComplete="off"
            ></input>
            <input
              className="buscarhome"
              type="submit"
              value="Buscar"
              id="botonbusqueda"
              autoComplete="off"
            ></input>
          </form>
        </div>
        <div className="menu">
          <Menu></Menu>
        </div>

        <div className="test">
          <Timeline></Timeline>
        </div>
      </div>
    );
  }
}
export default home;
