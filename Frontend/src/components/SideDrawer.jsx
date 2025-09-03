import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faCog,
  faArrowLeft,
  faTag,
  faChevronRight,
  faAdd,
} from "@fortawesome/free-solid-svg-icons";
import { useGetLabels } from "../hooks/useLabelApi";
import LabelEditWindow from "./NoteBoardCompo/LabelEditWindow";

const navItems = [
  { name: "Home", path: "/home", icon: faHouse },

  { name: "Settings", path: "/settings", icon: faCog },
  { name: "Labels", path: "/profile", icon: faTag, childs: true },
];

export default function SideDrawer() {
  const [open, setOpen] = useState(true);
  const [openChilds, setOpenChilds] = useState(false);
  const [isLabelEditOpen, setIsEditLabelOpen] = useState(false);
  const location = useLocation();
  const isLabelPage = location.pathname.startsWith("/labels/");

  const {
    data: labels,
    error: labelError,
    loading: labelLoading,
    refetch: labelRefetch,
  } = useGetLabels("http://localhost:4000/api/labels");

  return (
    <div
      className={`h-[calc(100vh-60px)] bg-white/5 border border-gray-400/20 shadow-lg shadow-gray-200/30 flex flex-col rounded-r-md 
      transition-[width] duration-500 ease-in-out
      ${open ? "w-[220px]" : "w-[70px]"}`}
    >
      {/* Toggle button */}
      <div className="flex items-center justify-end p-3 border-b border-[#25879f]">
        <button
          onClick={() => {
            openChilds ? setOpenChilds((prev) => !prev) : "";
            setOpen((prev) => !prev);
          }}
          className="w-9 h-9 flex items-center justify-center rounded-xl border border-[#25879f] text-white cursor-pointer"
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            className={`transition-transform duration-500 ease-in-out ${
              !open ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Nav links */}
      <div
        className={`h-full transition-all duration-300 px-2 mt-4
    ${openChilds ? "overflow-y-auto" : ""}`}
        j
      >
        <nav className="flex flex-col gap-2  ">
          {navItems.map((item, i) =>
            item.childs ? (
              <div key={i} className="flex flex-col gap-1">
                <div
                  onClick={() => {
                    !open && setOpen(true);
                    setOpenChilds((prev) => !prev);
                  }}
                  className={`group flex items-center relative rounded-lg text-white cursor-pointer
    transition-all duration-500 ease-in-out
    ${open ? "gap-3 px-3 py-2 justify-start" : "justify-center p-3"}
    ${
      isLabelPage
        ? "bg-gradient-to-r from-cyan-500 to-[#25879f]" // active if on label page
        : "hover:bg-[#25879fb5]"
    }`}
                >
                  <FontAwesomeIcon icon={item.icon} className="text-lg" />
                  <span
                    className={`whitespace-nowrap text-base transition-all duration-500 ease-in-out
      ${
        open
          ? "opacity-100 translate-x-0 w-full"
          : "opacity-0 -translate-x-3 w-0"
      }
    `}
                  >
                    {item.name}
                  </span>
                  {open && (
                    <button className="ml-auto">
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className={`transition-all duration-300 ${
                          openChilds ? "rotate-90" : ""
                        }`}
                      />
                    </button>
                  )}
                </div>

                {/* Submenu */}
                <div
                  className={`flex flex-col ml-4 gap-1 transition-all duration-500 ease-in-out 
                ${
                  open && openChilds
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
                >
                  {labelLoading && (
                    <span className="text-gray-400 text-sm">Loading...</span>
                  )}
                  {labelError && (
                    <span className="text-red-400 text-sm">
                      Failed to load labels
                    </span>
                  )}
                  {labels &&
                    labels.map((label, idx) => (
                      <div key={idx} className="relative">
                        <NavLink
                          to={`/labels/${label._id}`}
                          className={({ isActive }) =>
                            `flex group items-center ml-6 rounded-md px-2 py-1 text-md text-gray-200 transition-colors
                          ${
                            isActive
                              ? "bg-cyan-600 text-white"
                              : "hover:bg-[#25879f66]"
                          }`
                          }
                        >
                          <span className="flex-1">{label.name}</span>
                        </NavLink>
                      </div>
                    ))}
                  {/* Edit label */}
                  <div
                    onClick={() => setIsEditLabelOpen((prev) => !prev)}
                    className="w-full flex items-center text-gray-300 cursor-pointer mt-2 px-2 py-1 rounded-md border border-dashed border-[#25879f] hover:bg-[#25879f33]"
                  >
                    <FontAwesomeIcon
                      icon={faAdd}
                      className="mr-2 text-cyan-400"
                    />
                    <span className="font-medium">Edit label</span>
                  </div>
                  {isLabelEditOpen && (
                    <div className="fixed inset-0 bg-gradient-to-br from-[#0b191f] via-[#0f2027] to-[#203a43] flex items-center justify-center z-50">
                      <LabelEditWindow
                        onClose={() => {
                          setIsEditLabelOpen(false);
                          labelRefetch();
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <NavLink
                to={item.path}
                key={i}
                className={({ isActive }) =>
                  `group flex items-center relative rounded-lg text-white 
                transition-all duration-500 ease-in-out
                ${
                  open ? "gap-3 px-3 py-2 justify-start" : "justify-center p-3"
                } 
                ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500 to-[#25879f]"
                    : "hover:bg-[#25879fb5]"
                }`
                }
              >
                <FontAwesomeIcon icon={item.icon} className="text-lg" />
                <span
                  className={`whitespace-nowrap text-base transition-all duration-500 ease-in-out
                ${
                  open
                    ? "opacity-100 translate-x-0 w-full"
                    : "opacity-0 -translate-x-3 w-0 "
                }`}
                >
                  {item.name}
                </span>
              </NavLink>
            )
          )}
        </nav>
      </div>

      {/* Footer */}
      <div className="mt-auto p-3 text-gray-400 text-xs text-center"></div>
    </div>
  );
}
