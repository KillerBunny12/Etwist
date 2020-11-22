import React, { Component } from "react";
import Navara from "./Navbar";
import "./User.scss";
import Axios from "axios";

class User extends Component {
  constructor() {
    super();
    this.state = {
      user: JSON.parse(sessionStorage.getItem("userData")),
      data: JSON.parse(sessionStorage.getItem("personalData")),
      estados: [],
      photoData: [],
    };
  }

  componentDidMount() {
    this.getEstado();
  }

  //Metodo get de los estados civiles
  getEstado() {
    Axios.get("http://etwist.test/api/estadocivil").then((response) => {
      console.log(response.data);
      this.setState({ estados: response.data });
    });
  }

  //Funcion para actualizar la informacion personal
  updateInfo = (event) => {
    event.preventDefault();
    let info = {
      id: this.state.data.id,
      Name: event.target[0].value,
      Lastname: event.target[1].value,
      birthdate: event.target[2].value,
      idStatus: event.target[3].value,
    };
    console.log(
      "Info: ",
      info.Name,
      info.Lastname,
      info.birthdate,
      info.idStatus
    );
    Axios.post("http://etwist.test/api/updateinfo", info).then((response) => {
      console.log(response);
      this.props.history.push("/");
    });
  };

  //Metodo para modificar un usuario
  updateUser = (event) => {
    event.preventDefault();
    let user = {
      id: this.state.user.id,
      name: event.target[0].value,
      email: event.target[1].value,
    };

    Axios.post("http://etwist.test/api/auth/update", user)
      .then((response) => {
        console.log(response);
        this.props.history.push("/");
      })
      .catch((error) => console.log(error));
  };

  //Metodo para poner una foto de perfil
  updatePic() {
    let wasd = {
      id: this.state.user.id,
      profilePic: this.state.photoData.data.image.url,
    };
    Axios.post("http://etwist.test/api/auth/updateprofilepic", wasd)
      .then((response) => {
        console.log(wasd.id, wasd.profilePic);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //Maneja la imagen que se va a subir
  fileChange = () => {
    var file = document.getElementById("input_img");
    var form = new FormData();
    form.append("image", file.files[0]);
    Axios({
      url:
        "https://api.imgbb.com/1/upload?key=f969ccceaa49c93b3c86a6fb0a5dc5ed",
      method: "POST",
      timeout: 0,
      processData: false,
      mimeType: "multipart/form-data",
      contentType: false,
      data: form,
    })
      .then((response) => {
        this.setState({ photoData: response.data });
        console.log(this.state.photoData.data.image.url);
        if (
          window.confirm("Está seguro que desea actualizar su foto de perfil?")
        ) {
          this.updatePic();
          this.props.history.push("/");
        }
      })
      .catch((error) => {
        alert("Error al subir la imagen", error);
      });
  };

  render() {
    return (
      <div>
        <Navara></Navara>
        <div className="container">
          <div className="profile">
            <h2>Perfil de usuario</h2>
            <img
              id="profilePic"
              src={this.state.user.profilePic}
              alt="pic"
            ></img>
            <label type="text" id="username">
              {this.state.user.name}
            </label>
            <label className="limagen2" htmlFor="input_img">
              Seleccione una foto de perfil
            </label>
            <input
              type="file"
              id="input_img"
              accept="image/png, image/jpeg/, image/gif"
              onChange={this.fileChange}
            ></input>
            <form onSubmit={this.updateUser}>
              <label htmlFor="user">Nombre de usuario:</label>
              <input
                type="text"
                id="user"
                defaultValue={this.state.user.name}
              ></input>
              <label htmlFor="user">Correo electrónico:</label>
              <input
                type="text"
                id="user"
                defaultValue={this.state.user.email}
              ></input>
              <input type="submit" value="Actualizar"></input>
            </form>
          </div>
          <div className="information profile">
            <label className="edito">
              Editado por ultima vez:{" "}
              {this.state.data.updated_at.substring(0, 10)} a las:{" "}
              {this.state.data.updated_at.substring(11, 16)}{" "}
            </label>
            <h2>Información personal</h2>
            <h4>*Opcional</h4>
            <form onSubmit={this.updateInfo}>
              <label htmlFor="Name">Su nombre:</label>
              <input
                id="Name"
                type="text"
                defaultValue={this.state.data.Name}
              ></input>
              <label htmlFor="Lastname">Su apellido:</label>
              <input
                id="Lastname"
                type="text"
                defaultValue={this.state.data.Lastname}
              ></input>
              <label htmlFor="birthdate">Su fecha de nacimiento:</label>
              <input
                id="birthdate"
                type="date"
                defaultValue={this.state.data.birthdate}
              ></input>
              <label htmlFor="estado">Estado sentimental:</label>
              <select id="estado">
                {this.state.estados.map((estado) => (
                  <option
                    key={estado.id}
                    defaultValue={estado.id}
                    value={estado.id}
                  >
                    {estado.situation}
                  </option>
                ))}
              </select>
              <input type="submit" value="Actualizar"></input>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default User;
