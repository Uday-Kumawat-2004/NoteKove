import { faSearch, faTimes, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useNavigate, useLocation } from "react-router-dom";

import { useEffect } from "react";


import { useSearch } from "../../contexts/SearchContext";

import { useAuth } from "../../context/AuthContext";



export default function Header() {


  const navigate = useNavigate();

  const location = useLocation();



  const {
    query,
    setQuery,
    searching,
    setSearching,
    inputRef,
    focusInput,
  } = useSearch();



  const { logout } = useAuth();




  useEffect(() => {


    if (location.pathname === "/Search") {


      setSearching(true);

      focusInput();


    } 
    
    else {


      setSearching(false);


    }


  }, [
    location.pathname,
    setSearching,
    focusInput
  ]);





  const handleClickSearch = () => {


    if (location.pathname !== "/Search") {


      navigate("/Search");


    }



    setSearching(true);

    focusInput();


  };





  const handleCloseSearch = () => {


    setSearching(false);


    setQuery("");


    navigate("/home");


  };






  const onChange = (e) => {


    setQuery(
      e.target.value
    );


  };





  async function handleLogout(){


    try{


      await logout();


      navigate(
        "/signin",
        {
          replace:true
        }
      );


    }
    catch(err){


      console.error(
        "Logout failed",
        err
      );


    }


  }





  return (


    <div className="flex w-screen h-[60px] items-center shadow-md shadow-gray-600 bg-transparent px-4">



      {/* LEFT */}


      <div className="flex items-center basis-1/4">


      </div>






      {/* SEARCH */}


      <div className="flex items-center justify-center basis-2/4 px-4">


        <div

          className="flex items-center h-10 w-full max-w-2xl bg-gray-700 rounded px-3 hover:bg-gray-600 transition-colors"

          onClick={handleClickSearch}

        >


          <FontAwesomeIcon

            icon={faSearch}

            className="text-gray-400 mr-3"

          />




          <input

            ref={inputRef}


            value={query}


            onChange={onChange}


            placeholder="Search notes..."


            className="flex-1 bg-transparent text-gray-300 placeholder-gray-400 outline-none"


            onFocus={() => {


              if(location.pathname !== "/Search"){


                navigate("/Search");


              }


              setSearching(true);


            }}

          />






          {searching && (


            <button


              onClick={(e)=>{


                e.stopPropagation();


                handleCloseSearch();


              }}


              className="ml-2 text-gray-400 hover:text-gray-200 cursor-pointer"

            >


              <FontAwesomeIcon icon={faTimes}/>


            </button>


          )}



        </div>


      </div>








      {/* RIGHT */}


      <div className="flex items-center justify-end basis-1/4 pr-4">



        <button


          onClick={handleLogout}


          className="flex items-center gap-2 text-gray-300 hover:text-red-400 transition cursor-pointer"


        >


          <FontAwesomeIcon icon={faRightFromBracket}/>


          Logout



        </button>



      </div>




    </div>


  );


}