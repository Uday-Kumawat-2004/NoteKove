
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import Labels from "./pages/Labels";
function App() {
  return (
    <div className="w-screen h-screen bg-gradient-to-br from-[#0b191f] via-[#0f2027] to-[#203a43]">
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/home" element={<Home />}/>
          <Route path="/labels" element={<Labels/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
