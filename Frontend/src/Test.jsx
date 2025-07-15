import "./App.css";
import SideDrawer from "./componets/SideDrawer";
import { BrowserRouter } from "react-router-dom";
import Header from "./componets/Header";
import Home from "../pages/Home";

function Test() {
  return (
    <>
      <BrowserRouter>
        
        <Home/>
      </BrowserRouter>
    </>
  );
}

export default Test;
