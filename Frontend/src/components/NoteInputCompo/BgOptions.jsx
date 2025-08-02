import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette } from "@fortawesome/free-solid-svg-icons";

export default function BgOptions({
  isOpen,
  setIsLabelOpen,
  currentColor,
  setIsOpen,
  onColorSelect,
}) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const colorOptions = [
    //default
    { name: "Transparent", color: "transparent" },
    // Reds
    { name: "Fiery Red", color: "#6a040ebb" },
    { name: "Crimson Maroon", color: "#6d202f" },
    { name: "Burnt Sienna", color: "#612f1c" },

    // Orange / Gold
    { name: "Golden Mustard", color: "#926c15" },

    // Greens
    { name: "Olive Grove", color: "#386641" },
    { name: "Forest Moss", color: "#304C3C" },
    { name: "Calm Green", color: "#3c6e71" },
    { name: "Teal Green", color: "#2c605d" },

    // Blues
    { name: "Deep Ocean", color: "#246377" },
    { name: "Navy Blue", color: "#003566" },
    { name: "Slate Blue", color: "#415a77" },

    // Purples
    { name: "Royal Purple", color: "#3d0066" },
    { name: "Vintage Plum", color: "#6C3A4F" },
    { name: "Mauve Rose", color: "#785964" },

    // Neutral
    { name: "Ash Grey", color: "#403d39" },
  ];
  return (
    <div className="relative group/bg ml-2 transition-all duration-300 ease-in-out">
      <button
        onClick={() => {
          setIsOpen((prev) => {
            const newState = !prev;
            if (newState) {
              setIsLabelOpen(false);
            }
            return newState;
          });
        }}
        className="flex items-center justify-center cursor-pointer p-1 transition duration-300 ease-in-out"
      >
        <FontAwesomeIcon
          icon={faPalette}
          className={`text-xl ${
            isOpen ? "text-gray-400" : "text-gray-200"
          } hover:shadow-lg transition duration-300 ease-in-out`}
        />
      </button>

      {!isOpen && (
        <span className="absolute bg-[#1f3a3b] bottom-full left-1/2 -translate-x-12 translate-y-7 mb-1 px-2 py-1 text-gray-200 text-xs rounded opacity-0 group-hover/bg:opacity-100 group-hover:translate-y-14 transition-all duration-300 ease-in-out whitespace-nowrap">
          Background color
        </span>
      )}

      {isOpen && (
        <div className="absolute bg-[#9da2a3] bottom-full left-1/2 translate-x-2 translate-y-18 mb-1 px-2 py-1 text-gray-200 text-xs rounded transition-all duration-300 ease-in-out whitespace-nowrap">
          <div className="flex gap-1 p-0.5 w-auto h-auto">
            {colorOptions.map(({ name, color }, index) => (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div
                  onClick={() => onColorSelect(color)}
                  className="w-[30px] h-[26px] rounded-full  cursor-pointer border-2 hover:scale-105 transition-transform duration-150 ease-in-out"
                  style={
                    color === "transparent"
                      ? {
                          backgroundImage:
                            "linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%), linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%)",
                          backgroundSize: "10px 10px",
                          backgroundPosition: "0 0, 5px 5px",
                          backgroundColor: "#eee",
                          borderColor:
                            currentColor === color ? "#ffffff" : "transparent",
                        }
                      : {
                          backgroundColor: color,
                          borderColor:
                            currentColor === color ? "#ffffff" : "transparent",
                        }
                  }
                />
                {hoveredIndex === index && (
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 translate-y-13  px-2 py-1 text-xs bg-[#1f3a3b] text-white rounded whitespace-nowrap shadow">
                    {name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
