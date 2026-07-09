import { Navigate, Outlet } from "react-router-dom";


import { useAuth } from "../context/AuthContext";




export default function ProtectedRoute(){



  const {

    loading,

    isAuthenticated,

  } = useAuth();





  if(loading){


    return (

      <div className="w-screen h-screen flex justify-center items-center text-white">


        Loading...


      </div>

    );


  }






  if(!isAuthenticated){


    return (

      <Navigate

        to="/signin"

        replace

      />

    );


  }






  return <Outlet />;



}