import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faCog, faArrowLeft, faTag } from "@fortawesome/free-solid-svg-icons";

const navItems = [
  { name: "Home", path: "/home", icon: faHouse },
  { name: "Labels", path: "/profile", icon: faTag, childs: true },
  { name: "Settings", path: "/settings", icon: faCog },
];

export default function SideDrawer() {
  const [open, setOpen] = useState(true);

  return (
    <div
      className={`h-[calc(100vh-60px)]  bg-white/5 border border-gray-400/20 shadow-lg shadow-gray-200/30 flex flex-col rounded-r-md 
      transition-[width] duration-500 ease-in-out
      ${open ? "w-[220px]" : "w-[70px]"}`}
    >
      {/* Toggle button */}
      <div className="flex items-center justify-end p-3 border-b border-[#25879f]">
        
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="w-9 h-9 flex items-center justify-center rounded-xl border border-[#25879f]  transition-colors text-white cursor-pointer"
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            className={`transition-transform duration-500 ease-in-out ${!open ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* Nav links */}
      <nav className="flex flex-col gap-2 px-2 mt-4">
        {navItems.map((item, i) => (
          <NavLink
            to={item.path}
            key={i}
            className={({ isActive }) =>
              `group flex items-center relative rounded-lg text-white 
              transition-all duration-500 ease-in-out
              ${open ? "gap-3 px-3 py-2 justify-start" : "justify-center p-3"} 
              ${isActive ? "bg-gradient-to-r from-cyan-500 to-[#25879f]" : "hover:bg-[#25879fb5]"}`
            }
          >
            <FontAwesomeIcon icon={item.icon} className="text-lg" />

            {/* Smooth label */}
            <span
              className={`whitespace-nowrap text-base transition-all duration-500 ease-in-out
              ${open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3 w-0 overflow-hidden"}`}
            >
              {item.name}
            </span>

            {/* Tooltip when closed */}
            {!open && (
              <span
                className="absolute left-[75px] top-1/2 -translate-y-1/2 
                bg-black text-gray-200 text-sm px-2 py-1 rounded-lg opacity-0 scale-95 
                group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out"
              >
                {item.name}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="mt-auto p-3 text-gray-400 text-xs text-center"></div>
    </div>
  );
}
