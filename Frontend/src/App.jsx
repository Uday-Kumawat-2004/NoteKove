import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { SearchProvider } from "./contexts/SearchContext";

import ProtectedRoute from "./routes/ProtectedRoute";

import AppLayout from "./layouts/AppLayout";


import Signup from "./pages/Signup";
import Signin from "./pages/Signin";

import Home from "./pages/Home";
import LabelPage from "./pages/LabelPage";
import TrashPage from "./pages/TrashPage";
import Archive from "./pages/Archive";
import Search from "./pages/Search";




function App(){


  return (


    <div className="w-screen h-screen bg-gradient-to-br from-[#0b191f] via-[#0f2027] to-[#203a43]">



      <SearchProvider>



        <Router>



          <Routes>



            {/* Public routes */}


            <Route

              path="/"

              element={<Signup />}

            />


            <Route

              path="/signup"

              element={<Signup />}

            />


            <Route

              path="/signin"

              element={<Signin />}

            />






            {/* Protected app routes */}


            <Route element={<ProtectedRoute />}>


              <Route element={<AppLayout />}>


                <Route

                  path="/home"

                  element={<Home />}

                />


                <Route

                  path="/labels/:id"

                  element={<LabelPage />}

                />


                <Route

                  path="/ArchivedItems"

                  element={<Archive />}

                />


                <Route

                  path="/TrashedItems"

                  element={<TrashPage />}

                />


                <Route

                  path="/Search"

                  element={<Search />}

                />


              </Route>


            </Route>



          </Routes>



        </Router>



      </SearchProvider>



    </div>


  );


}



export default App;