
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSearch } from "../../contexts/SearchContext";
export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { query, setQuery, searching, setSearching, inputRef, focusInput } = useSearch();

  // handle route changes
  useEffect(() => {
    if (location.pathname === "/Search") {
      setSearching(true);
      focusInput();
    } else {
      setSearching(false);
    }
  }, [location.pathname, setSearching, focusInput]);

  const handleClickSearch = () => {
    if (location.pathname !== "/Search") navigate("/Search");
    setSearching(true);
    focusInput();
  };

  const handleCloseSearch = () => {
    setSearching(false);
    setQuery(""); // optional: clear the query
    navigate("/home"); // back to home
  };

  const onChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="flex w-screen h-[60px] items-center shadow-md shadow-gray-600 bg-transparent px-4">
      {/* Left: logo */}
      <div className="flex items-center basis-1/4">
        {/* <img src="/NoteKove2.png" alt="logo" className="h-12 w-12 rounded" /> */}
      </div>

      {/* Center: search input */}
      <div className="flex items-center justify-center basis-2/4 px-4">
        <div
          className="flex items-center h-10 w-full max-w-2xl bg-gray-6y00 rounded px-3 hover:bg-gray-700 transition-colors"
          onClick={handleClickSearch}
        >
          <FontAwesomeIcon icon={faSearch} className="text-gray-400 mr-3" />
          <input
            ref={inputRef}
            value={query}
            onChange={onChange}
            placeholder="Search notes..."
            className="flex-1 bg-transparent text-gray-300 placeholder-gray-400 outline-none"
            onFocus={() => {
              if (location.pathname !== "/Search") navigate("/Search");
              setSearching(true);
            }}
          />

          {/* Show ❌ only when searching */}
          {searching && (
            <button
              onClick={(e) => {
                e.stopPropagation(); // prevent parent click
                handleCloseSearch();
              }}
              className="ml-2 text-gray-400 hover:text-gray-200 transition-colors cursor-pointer"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          )}
        </div>
      </div>

      {/* Right: profile/settings */}
      <div className="flex items-center justify-end basis-1/4 pr-4">
        {/* profile/settings icons */}
      </div>
    </div>
  );
}
