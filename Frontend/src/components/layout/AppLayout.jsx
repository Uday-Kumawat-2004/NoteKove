import { Outlet } from "react-router-dom";


import Header from "../components/header/Header";

import SideDrawer from "../components/sidebar/SideDrawer";




export default function AppLayout(){



  return (


    <div className="h-screen flex flex-col overflow-hidden">



      <Header />



      <div className="flex flex-1 overflow-hidden">



        <SideDrawer />



        <main className="flex-1 overflow-y-auto p-10">



          <Outlet />



        </main>



      </div>



    </div>


  );



}