import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function SideDrawer() {
  const [toggle, setToggle] = useState(true);

  return (
    <div
      className={`flex flex-col p-2.5 ${
        toggle ? "w-[200px]" : "w-[65px]"
      } min-h-screen max-h-screen transition-all duration-300`}
    >
      <div className="flex items-center">
        <button
          type="button"
          onClick={() => setToggle((prev) => !prev)}
          className="w-[40px] bg-[#1f3a3b] mb-5 border-2 border-[#3c6e71] h-[40px] flex items-center justify-center cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out hover:scale-95 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#3c6e71] before:to-[#3c6e71] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] hover:before:left-0 text-[#fff]"
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            className={`transition-transform duration-300 ${
              toggle ? "" : "scale-x-[-1]"
            }`}
          />
        </button>
      </div>
      <div className=" flex flex-col gap-2 w-full h-auto">
        {[
          {
            name: "Home",
            path: "/home",
            icon: <FontAwesomeIcon icon={faHouse} />,
          },
        ].map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className={({ isActive }) =>
              ` w-[40px] h-[40px] flex items-center gap-3 p-2  text-white transition-colors ${
                isActive ? "bg-[#3c6e71]" : "hover:bg-[#284b4c]"
              }`
            }
          >
            <span className=" text-lg">{item.icon}</span>
            
              <span
                className={`text-md whitespace-nowrap origin-left transition-all duration-300 ${
                  toggle
                    ? "opacity-100 scale-100 ml-2"
                    : "opacity-0 scale-0 ml-0"
                }`}
              >
                {item.name}
              </span>
            
          </NavLink>
        ))}
      </div>
    </div>
  );
}
