import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import { faThumbtack, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import BgOptions from "./NoteInputCompo/BgOptions";

export default function NoteInput() {
  const [toggle, setToggle] = useState(false);
  const [expansionLevel, setExpansionLevel] = useState(0);
  const [pin, setPin] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#3c6e71");

  const noteRef = useRef(null);
  const titleRef = useRef(null);

  function handleToggle() {
    if (!toggle) {
      setToggle(true);
    }
  }

  function handleExpansion() {
    const text = noteRef.current?.value || "";
    const length = text.length;

    if (length <= 600) {
      setExpansionLevel(0);
    } else if (length > 600 && length <= 900) {
      setExpansionLevel(1);
    } else {
      setExpansionLevel(2);
    }
  }

  return (
    <div
      className={`flex ${
        toggle && "flex-col gap-2 border   border-gray-300"
      } items-center p-1.5 shadow-sm shadow-[#1b2828] w-[600px] h-auto transition-all duration-300 ease-in-out border border-gray-300 transition-border bg-[#3c6e71]`}
    >
      {toggle && (
        <div className="flex flex-1 w-full h-auto transition-all duration-300 ease-in-out">
          <input
            ref={titleRef}
            className="flex-1 bg-transparent text-white text-lg h-[35px] placeholder-gray-200 border-none outline-none focus:outline-none focus:border-none transition-all duration-300 ease-in-out"
            placeholder="Title"
            type="text"
          />
          <div className="flex justify-center items-center relative group mr-2 transition-all duration-300 ease-in-out">
            <button
              onClick={() => setPin((pin) => !pin)}
              className="flex items-center justify-center cursor-pointer bg-[#3c6e71] p-1 ml-2 transition duration-300 ease-in-out"
            >
              <FontAwesomeIcon
                icon={faThumbtack}
                className={`text-lg text-gray-200 ${
                  pin && "text-yellow-200"
                }  hover:text-yellow-200 transition duration-300 ease-in-out`}
              />
            </button>
            <div className="absolute bg-[#1f3a3b] bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 text-gray-200 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out whitespace-nowrap">
              {!pin ? "Pin" : "Unpin"}
            </div>
          </div>
          <div className="flex justify-center items-center relative group transition-all duration-300 ease-in-out">
            <button
              onClick={() => {
                setToggle(false);
                setExpansionLevel(0);
                if (noteRef.current) {
                  noteRef.current.value = "";
                  noteRef.current.style.height = "auto";
                }
                if (titleRef.current) {
                  titleRef.current.value = "";
                }
              }}
              className="flex items-center justify-center cursor-pointer bg-[#3c6e71] p-1 ml-2 transition duration-300 ease-in-out"
            >
              <FontAwesomeIcon
                icon={faXmark}
                className="text-xl text-gray-200 hover:text-red-400 transition duration-300 ease-in-out"
              />
            </button>
            <div className="absolute bg-[#1f3a3b] bottom-full left-1/2 -translate-x-6 translate-y-2 mb-1 px-2 py-1 text-gray-200 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out whitespace-nowrap">
              Cancel
            </div>
          </div>
        </div>
      )}

      <textarea
        ref={noteRef}
        onClick={handleToggle}
        rows={1}
        placeholder="Take a note..."
        className={`flex-1 w-full text-white placeholder-gray-200 border-none outline-none bg-transparent
          ${
            toggle && expansionLevel === 0
              ? "min-h-[250px]"
              : toggle && expansionLevel === 1
              ? "min-h-[375px]"
              : toggle && expansionLevel === 2
              ? "min-h-[500px]"
              : "min-h-auto"
          } overflow-y-auto resize-none transition-all duration-300 ease-in-out`}
        onInput={(e) => {
          e.target.style.height = "auto";
          e.target.style.height = `${e.target.scrollHeight}px`;
          handleExpansion();
        }}
      />

      {!toggle && (
        <div className="relative group ml-2 transition-all duration-300 ease-in-out">
          <button className="flex items-center justify-center cursor-pointer bg-[#3c6e71] p-1 transition duration-300 ease-in-out">
            <FontAwesomeIcon
              icon={faSquareCheck}
              className="text-xl text-gray-200 hover:shadow-lg hover:shadow-[#59a4a8] transition duration-300 ease-in-out"
            />
          </button>
          <div className="absolute bg-[#1f3a3b] bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 text-gray-200 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out whitespace-nowrap">
            New list
          </div>
        </div>
      )}

      {toggle && (
        <div className="flex w-full items-center transition-all duration-300 ease-in-out">
          <div className="flex flex-1">
            <BgOptions
              isOpen={isPaletteOpen}
              currentColor={backgroundColor}
              setIsOpen={setIsPaletteOpen}
              onColorSelect={setBackgroundColor}
            />
          </div>

          <button
            type="button"
            className="w-[80px] border-2 border-[#38caef] h-[30px] flex items-center justify-center cursor-pointer relative overflow-hidden transition-all duration-300 ease-in-out hover:scale-95 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#38caef] before:to-[#38caef] before:transition-all before:duration-300 before:ease-in-out before:z-[-1] hover:before:left-0 text-gray-100"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}
