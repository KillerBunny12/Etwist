import React, { Component } from "react";
import "../post.scss";
import axios from "axios";

class Menu extends Component {
  constructor() {
    super();
    this.state = {
      domainUser: "http://etwist.test/api/auth/user",
      domainLogout: "http://etwist.test/api/auth/logout",
      image: null,
      UserToken: localStorage.getItem("userIsAuthToken"),
      user: [],
      imagen: "https://i.ibb.co/zmdh9hx/FF4D00-0.png",
      personalData: [],
      photoData: [],
      isActive: true,
    };
  }

  componentDidMount() {
    this.getUser();
  }

  //Metodo de publicar, hace una peticion post con todo lo necesario
  //Para publicar un post
  publicar = (event) => {
    event.preventDefault();

    let post = {
      description: event.target[0].value,
      imageURL: this.state.imagen,
      UserID: this.state.user.id,
    };

    axios.post("http://etwist.test/api/post", post).then((response) => {
      console.log(response.status);
      if (this.state.photoData.status === 200 || response.status === 200) {
        alert("Se ha publicado su post");
        window.location.reload();
      }
    });
  };

  enable = (event) => {
    if (document.getElementById("Descripcion").value === "") {
      this.setState({ isActive: true });
    } else {
      if (this.state.isActive === false) {
      } else {
        this.setState({ isActive: false });
      }
    }
  };

  //Agarra la informacion personal de tal usuario
  getInfo() {
    axios
      .get("http://etwist.test/api/personal/" + this.state.user.id)
      .then((response) => {
        console.log(response.data);
        this.setState({ personalData: response.data });
        sessionStorage.setItem(
          "personalData",
          JSON.stringify(this.state.personalData)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }


  //Método para agarrar la imagen que se va a publicar
  fileChange = () => {
    var file = document.getElementById("input_img");
    var form = new FormData();
    form.append("image", file.files[0]);
    axios({
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
        console.log(response);
        this.setState({ photoData: response });
        console.log("Photodata: ", this.state.photoData);
        var imagee = this.state.photoData.data.data.image.url;
        this.setState({ imagen: imagee });
        console.log("URL en el state: ", this.state.imagen);
        if (this.state.photoData.status === 200) {
          alert("La imagen se ha cargado existosamente");
          this.setState({ isActive: false });
        }
      })
      .catch((error) => {
        alert("Error al subir la imagen", error);
      });
  };

  //Get del usuario en sesión
  getUser = () => {
    let options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: this.state.UserToken,
        "X-Requested-With": "XMLHttpRequest",
      },
    };

    axios
      .get(this.state.domainUser, options)
      .then((response) => {
        this.setState({ user: response.data });
        sessionStorage.setItem("userData", JSON.stringify(this.state.user));
        console.log(this.state.user);
        this.getInfo();
      })
      .catch((error) => {
        console.log("Error", error.message);
      });
  };

  //Metodo render
  render() {
    return (
      <div className="container">
        <div className="postear">
          <div className="avatarpost1">
            <img
              className="avatarpost2"
              src={this.state.user.profilePic}
              alt="avatar"
            ></img>
            <label className="usuariopost">{this.state.user.name}</label>
          </div>

          <form className="publicacionpensar" onSubmit={this.publicar}>
            <textarea
              maxLength="140"
              placeholder="Que estás pensando...?"
              className="posttexto"
              type="text"
              id="Descripcion"
              name="Descripcion"
              onChange={this.enable}
            ></textarea>

            <input
              className="publicar"
              type="submit"
              value="Publicar"
              disabled={this.state.isActive}
            ></input>
          </form>
          <form className="postform">
            <label className="limagen">
              <input
                className="botonimagen"
                type="file"
                id="input_img"
                name="imagen"
                onChange={this.fileChange}
                accept="image/png, image/jpeg, image/gif"
              ></input>
              Agregar imagen
            </label>
          </form>
        </div>
      </div>
    );
  }
}
export default Menu;
