import Registro from "./Components/Registro/Registro";
import Usuario from "./Components/Busqueda/Usuario";
import Search from "./Components/Busqueda/Busqueda";
import Login from "./Components/Login/login";
import Home from "./Components/Home/home";
import Logout from "./Components/Home/Others/Logout";
import Post from "./Components/Home/Others/Post";
import User from "./Components/Home/Others/User";

import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
function App() {
  return (
    /* Se crean las rutas */
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/register" component={Registro} />
          <Route path="/usuario" component={Usuario} />
          <Route path="/search" component={Search} />
          <Route path="/home" component={Home} />
          <Route path="/logout" component={Logout} />
          <Route path="/user" component={User} />
          <Route path="/post" component={Post} />
          <Route exactpath="/" component={Login} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
