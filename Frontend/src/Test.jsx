import "./App.css";
import SideDrawer from "../componets/SideDrawer";
import { BrowserRouter } from "react-router-dom";
import Header from "../componets/Header";

function Test() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <SideDrawer />
      </BrowserRouter>
    </>
  );
}

export default Test;
