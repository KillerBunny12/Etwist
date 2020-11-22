import React, { Component } from "react";
import axios from "axios";

class Logout extends Component{
    componentDidMount(){
        localStorage.clear();
        this.props.history.push("/");
        sessionStorage.clear();
    }

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
              <p>Cerrando Sesión</p>
          </div>
        );
      }
}
export default Logout;