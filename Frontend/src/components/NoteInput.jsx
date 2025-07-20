import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import { faThumbtack, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import BgOptions from "./NoteInputCompo/BgOptions";
import LabelsDiv from "./NoteInputCompo/labelsDiv";
import LabelOptions from "./NoteInputCompo/LabelOptions";
import useGetLabels from "../hooks/useGetLabels";

export default function NoteInput() {
  const [toggle, setToggle] = useState(false);
  const [expansionLevel, setExpansionLevel] = useState(0);
  const [pin, setPin] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#3c6e71");
  const [islabelOpen, setIsLabelOpen] = useState(false);
  const [onLabelSelect, setOnLabelSelect] = useState([]);
  const {
    data: labels,
    error: labelError,
    loading: labelLoading,
  } = useGetLabels("http://localhost:4000/api/createLabel");
  console.log(onLabelSelect);

  const noteRef = useRef(null);
  const titleRef = useRef(null);

  function handleToggle() {
    if (!toggle) {
      setToggle(true);
    }
  }

  const handleTitleInput = () => {
    const textarea = titleRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset height
      textarea.style.height = `${textarea.scrollHeight}px`; // Set new height
    }
  };

  function handleExpansion() {
    const text = noteRef.current?.value || "";
    const length = text.length;

    if (length <= 300) {
      setExpansionLevel(0);
    }else if (length <= 600) {
      setExpansionLevel(1);
    } else if (length > 600 && length <= 900) {
      setExpansionLevel(2);
    } else {
      setExpansionLevel(3);
    }
  }

  return (
    <div
      className={`flex ${
        toggle && "flex-col gap-2 border   border-gray-300"
      } items-center p-1.5 shadow-sm shadow-[#1b2828] w-[600px] h-auto transition-all duration-300 ease-in-out border border-gray-300 transition-border`}
      style={{ backgroundColor }}
    >
      {toggle && (
        <div className="flex flex-1 w-full h-auto transition-all duration-300 ease-in-out">
          <textarea
            ref={titleRef}
            onInput={handleTitleInput}
            className="flex-1 bg-transparent text-white text-lg max-h-[300px] overflow-y-auto placeholder-gray-200 border-none outline-none focus:outline-none transition-all duration-300 ease-in-out resize-none"
            placeholder="Title"
            rows={1}
            maxLength={150}
          />

          <div className="flex justify-center  relative group mr-2 transition-all duration-300 ease-in-out">
            <button
              onClick={() => setPin((pin) => !pin)}
              className="flex  justify-center cursor-pointer p-1 ml-2 transition duration-300 ease-in-out"
            >
              <FontAwesomeIcon
                icon={faThumbtack}
                className={`text-lg text-gray-200 ${
                  pin && "text-yellow-200"
                }  hover:text-yellow-200 transition duration-300 ease-in-out`}
              />
            </button>
            <span className="absolute bg-[#1f3a3b] bottom-full left-1/2 -translate-x-1/2 translate-y-7 mb-1 px-2 py-1 text-gray-200 text-xs rounded opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out whitespace-nowrap">
              {!pin ? "Pin" : "Unpin"}
            </span>
          </div>
          <div className="flex justify-center  relative group transition-all duration-300 ease-in-out">
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
                setBackgroundColor("#3c6e71");
                setIsPaletteOpen(false);
                setOnLabelSelect([]);
              }}
              className="flex  justify-center cursor-pointer  p-1 ml-2 transition duration-300 ease-in-out"
            >
              <FontAwesomeIcon
                icon={faXmark}
                className="text-xl text-gray-200 hover:text-red-400 transition duration-300 ease-in-out"
              />
            </button>
            <span className="absolute bg-[#1f3a3b] bottom-full left-1/2 -translate-x-6 translate-y-7 mb-1 px-2 py-1 text-gray-200 text-xs rounded opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out whitespace-nowrap">
              Cancel
            </span>
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
              ? "min-h-[150px]"
              : toggle && expansionLevel === 1
              ? "min-h-[250px]"
              : toggle && expansionLevel === 2
              ? "min-h-[375px]"
              :toggle && expansionLevel === 3
              ? "min-h-[500px]"
              : "min-h-auto"
          } overflow-y-auto resize-none transition-all duration-300 ease-in-out`}
        onInput={(e) => {
          e.target.style.height = "auto";
          e.target.style.height = `${e.target.scrollHeight}px`;
          handleExpansion();
        }}
      />
      {toggle && <LabelsDiv 
      onLabelSelect={onLabelSelect}
      />}

      {!toggle && (
        <div className="relative group ml-2 transition-all duration-300 ease-in-out">
          <button className="flex items-center justify-center cursor-pointer  p-1 transition duration-300 ease-in-out">
            <FontAwesomeIcon
              icon={faSquareCheck}
              className="text-xl text-gray-200 hover:shadow-lg hover:shadow-[#59a4a8] transition duration-300 ease-in-out"
            />
          </button>
          <span className="absolute bg-[#1f3a3b] bottom-full left-1/2 -translate-x-1/2 translate-y-7 mb-1 px-2 py-1 text-gray-200 text-xs rounded opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out whitespace-nowrap">
            New list
          </span>
        </div>
      )}

      {toggle && (
        <div className="flex w-full items-center transition-all duration-300 ease-in-out">
          <div className="flex flex-1 gap-2.5">
            <BgOptions
              isOpen={isPaletteOpen}
              currentColor={backgroundColor}
              setIsOpen={setIsPaletteOpen}
              onColorSelect={setBackgroundColor}
            />
            <LabelOptions
              islabelOpen={islabelOpen}
              setIsLabelOpen={setIsLabelOpen}
              onLabelSelect={onLabelSelect}
              setOnLabelSelect={setOnLabelSelect}
              labels={labels}
              loading={labelLoading}
              error={labelError}
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
