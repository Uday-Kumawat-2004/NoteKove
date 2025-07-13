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
          className="w-[40px] mb-5 h-[40px] flex items-center justify-center cursor-pointer relative overflow-hidden  text-[#fff]"
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            className={`text-xl transition-transform duration-300 ${
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
              `
            group relative ${
                toggle ? "w-full h-[40px]" : "w-[40px] h-[40px]"
              } transition-all duration-300 flex items-center gap-3 p-2  text-white ${
                isActive ? "bg-[#3c6e71]" : "hover:bg-[#284b4c]"
              }`
            }
          >
            <span className=" text-lg">{item.icon}</span>

            <span
              className={`text-md whitespace-nowrap origin-left transition-all duration-300 ${
                toggle ? "opacity-100 scale-100 ml-2" : "opacity-0 scale-0 ml-0"
              }`}
            >
              {item.name}
            </span>
            {!toggle && (
              <div
                className="absolute top-1/2 left-[40px] -translate-y-1/2 
                 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 
                 transition-all duration-200 z-50 text-gray-300 
                  px-3 py-2"
              >
                {item.name}
              </div>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
