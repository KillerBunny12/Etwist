import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navara from "../Home/Others/Navbar";
import "./Busqueda.scss";

class Busqueda extends Component {
  constructor() {
    super();
    this.state = {
      searchs: JSON.parse(sessionStorage.getItem("searchData")),
    };
  }

  componentDidMount() {
    console.log("Bus: ", this.state.searchs);
  }

  //Este método hace un post de la busqueda
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
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Metodo de renderizado
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
        <div className="container">
          <h2>Resultados de la búsqueda:</h2>
          {this.state.searchs.map((search) => (
            <div className="user">
              <img className="profilePic" src={search.profilePic}></img>
              <Link
                to={{
                  pathname: `/usuario`,
                  state: {
                    data: {
                      user: search,
                    },
                  },
                }}
              >
                {search.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default Busqueda;
