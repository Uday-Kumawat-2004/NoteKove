import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SearchProvider } from "./contexts/SearchContext";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import LabelPage from "./pages/LabelPage";
import TrashPage from "./pages/TrashPage";
import Archive from "./pages/Archive";
import Search from "./pages/Search";
function App() {
  return (
    <div className="w-screen h-screen bg-gradient-to-br from-[#0b191f] via-[#0f2027] to-[#203a43]">
      
      <SearchProvider>
        <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/home" element={<Home />} />
          <Route path="/labels/:id" element={<LabelPage />} />
          <Route path="/ArchivedItems" element={<Archive />} />
          <Route path="/TrashedItems" element={<TrashPage />} />
          <Route path="/Search" element={<Search />} />
        </Routes>
      </Router>
      </SearchProvider>
    </div>
  );
}

export default App;
