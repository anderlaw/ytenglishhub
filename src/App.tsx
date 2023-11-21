import "./App.css";
import { Outlet } from "react-router-dom";
import { RootComponent } from "layouts/Root";

const App = () => {
  return <RootComponent children={<Outlet />}></RootComponent>;
};

export default App;
