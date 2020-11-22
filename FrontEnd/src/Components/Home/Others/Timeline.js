import React, { Component } from "react";
import "./Timeline.scss";
import { Link } from "react-router-dom";
import axios from "axios";
class Timeline extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      pos: [],
      domainUser: "http://etwist.test/api/auth/user",
      UserToken: localStorage.getItem("userIsAuthToken"),
      user: [],
    };
  }

  componentDidMount() {
    this.getPosts();
    this.getUser();
  }

  //Metodo para dar like, hace peticion post
  like= id =>{
    let like ={
      idPost :id,
      idUser : this.state.user.id
    }
    axios.post("http://etwist.test/api/like",like).then((response)=>{
      window.location.reload();
    })
  }

  
  //Método para borrar una publicacion
  borrarpubli = (id) => {
    axios
      .post("http://etwist.test/api/delete_post?id=" + id)
      .then((response) => {
        if (response.status === 200) {
          console.log("Se ha eliminado con exito");
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log("Fallo:" + error.message);
      });
  };

  //Metodo para hacer un get del usuario
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
      })
      .catch((error) => {
        console.log("Error", error.message);
      });
  };

  //Metodo para hacer un get de los posts
  getPosts() {
    axios
      .get("http://etwist.test/api/post")
      .then((response) => {
        console.log("OK!", response.data);
        this.setState({ posts: response.data });
        this.setState({ pos: this.state.posts.reverse() });
      })
      .catch((error) => {
        console.log("Fallo:" + error.message);
      });
  }

  render() {
    return (
      <div className="container">
        {this.state.posts.map((post) => (
          <div className="contents" key={post.id}>
            <div className="timeline" key={post.id}>
              <div className="avatartimeline1" key={post.id}>
                <label className="datetimeline">
                  Publicado el: {post.created_at.substring(0, 10)} a las:{" "}
                  {post.created_at.substring(11, 16)}{" "}
                </label>
                <img
                  alt="Avatar de usuario"
                  className="avatarpost2"
                  src={post.users.profilePic}
                ></img>
                <label className="usuariotimeline">{post.users.name}</label>
                <div className="PostTimeline" key={post.id}>
                  <p className="textotimeline">{post.description}</p>
                </div>
              </div>

              <img
                className="imgtimeline"
                src={post.imageURL}
                alt="post pic"
              ></img>
              <hr className="hrtimeline"></hr>

              <button className="like" onClick={this.like.bind(this,post.id)}>
                <img
                  className="likeimg"
                  src="https://i.ibb.co/DD5Y8S5/favicon.png"
                  alt="like icon"
                />

              </button>

              <label className="likes">{post.likes.length}</label>
              <img
                className="likeimg"
                src="https://i.ibb.co/mXwVKTQ/comentarios.png"
                alt="like icon"
              ></img>
              <label className="comments">{post.comments.length}</label>
              <Link
                to={{
                  pathname: "/post",
                  state: {
                    data: {
                      id: post.id,
                    },
                  },
                }}
              >
                Ver discusión
              </Link>

              <button
                onClick={this.borrarpubli.bind(this, post.id)}
                hidden={this.state.user.id === post.UserID ? false : true}
                className="borrar"
              >
                <img
                  className="likeimg"
                  src="https://i.ibb.co/09zNgLQ/favicon-3.png"
                  alt="like icon"
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Timeline;
