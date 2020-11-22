import React, { Component } from "react";
import axios from "axios";
import "./comentarios.scss";
import Navara from "./Navbar";
import { Media } from "reactstrap";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [],
      user: JSON.parse(sessionStorage.getItem("userData")),
      comments: [],
      likes: [],
      userInfo: [],
      id: props.location.state.data.id,
    };
  }

  componentDidMount() {
    this.getPost();
  }

  //Metodo que hace petición post y guarda un comentario.
  comment = (event) => {
    event.preventDefault();
    let comment = {
      comment: event.target[0].value,
      idPost: this.state.post.id,
      idUser: this.state.user.id,
    };
    axios.post("http://etwist.test/api/comment", comment).then((response) => {
      window.location.reload();
    });
  };

  //Hace un get de un post mediante un id
  getPost() {
    axios
      .get("http://etwist.test/api/post/" + this.state.id)
      .then((response) => {
        this.setState({ post: response.data });
        this.setState({ userInfo: response.data.users });
        this.setState({ likes: response.data.likes });
        console.log(response.data);
        this.getComments();
      });
  }

  //Hace un get de los comentarios de cierta publicacion
  getComments() {
    axios
      .get("http://etwist.test/api/comment/" + this.state.id)
      .then((response) => {
        this.setState({ comments: response.data });
        console.log(response.data);
      })
      .catch((error) =>{
        console.log(error);
      })
  }

  //Metodo para saber la fecha
  getDate = str =>{
    return str.substring(0, 10) + " " + str.substring(11, 16);
  }
      

  render() {
    const { comments } = this.state.comments.reverse();
    return (
      <div>
        <Navara />

        <div className="container">
          <div className="comentario">
            <div className="creado">
              <div className="avatarTime">
                <label className="tiempo">
                  Publicado el: {this.state.post.created_at}
                </label>

                <img
                  alt="Avatar de usuario"
                  className="avatarUsuario"
                  src={this.state.userInfo.profilePic}
                />
                <label className="nombreUsuario">
                  {this.state.userInfo.name}
                </label>

                <div className="textPost">
                  <p>{this.state.post.description}</p>
                </div>
              </div>

              <img
                className="imagePostReal"
                alt="post de la imagen"
                src={this.state.post.imageURL}
              />

              <hr className="hrtimeline"></hr>

              <button className="like">
                <img
                  className="likeimg"
                  alt="Corazon"
                  src="https://i.ibb.co/DD5Y8S5/favicon.png"
                />
              </button>
              <label className="likes">{this.state.likes.length}</label>
              <form onSubmit={this.comment}>
                <input
                  type="text"
                  id="barra"
                  placeholder="Escribe un comentario"
                  autoComplete="off"
                ></input>
                <input type="submit" id="boton" value="Comentar"></input>
              </form>
            </div>
          </div>

          {this.state.comments.map((comentario) => (
            <div className="container Comments">
              <div className="fecha">Publicado el: {this.getDate(comentario.created_at)}</div>

              <img
                className="comentariopic"
                src={comentario.usuario.profilePic}
              ></img>
              <Media heading>{comentario.usuario.name}</Media>
              {this.state.comments.comment}

              {comentario.comment}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default Post;
