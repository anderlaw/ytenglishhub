import "./App.css";
import { Outlet } from "react-router-dom";
import { RootComponent } from "layouts/Root";
import React from "react";
import { GlobalComponent } from "./components/Global";

const App = () => {
  return <React.Fragment>
    <RootComponent children={<Outlet />}></RootComponent>
    <GlobalComponent/>
  </React.Fragment>;
};

export default App;
