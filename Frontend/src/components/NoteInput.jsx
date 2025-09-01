import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import { faThumbtack, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import BgOptions from "./NoteInputCompo/BgOptions";
import LabelsDiv from "./NoteInputCompo/LabelsDiv";
import LabelOptions from "./NoteInputCompo/LabelOptions";
import { useGetLabels } from "../hooks/useLabelApi";
import ListArea from "./NoteInputCompo/ListArea";
import Archive from "./NoteInputCompo/Archive";
import Reminder from "./NoteInputCompo/Reminder";
import RichTextEditor from "./NoteInputCompo/RichTextEditor";
import axios from "axios";

export default function NoteInput() {
  const [toggle, setToggle] = useState(false);
  const [expansionLevel, setExpansionLevel] = useState(0);
  const [pin, setPin] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("");
  const [islabelOpen, setIsLabelOpen] = useState(false);
  const [onLabelSelect, setOnLabelSelect] = useState([]);
  const [isListOpen, setIsListOpen] = useState(false);
  const [checklist, setChecklist] = useState([{ text: "", done: false }]);
  const [archived, setArchived] = useState(false);
  const [isRemiderOpen, setIsReminderOpen] = useState(false);
  const [reminderDate, setReminderDate] = useState("");
  const [title, setTitle] = useState("");
  const [noteContent, setNoteContent] = useState({
    raw: null,
    plainText: "",
    length: 0,
  });
  const[editorKey, setEditorKey] = useState("")
  const [isSaving, setIsSaving] = useState(false);
  const {
    data: labels,
    error: labelError,
    loading: labelLoading,
  } = useGetLabels("http://localhost:4000/api/createLabel");
  console.log(onLabelSelect);
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

  function handleExpansion(length) {
    if (length <= 250) {
      setExpansionLevel(0);
    } else if (length <= 600) {
      setExpansionLevel(1);
    } else if (length <= 1200) {
      setExpansionLevel(2);
    } else {
      setExpansionLevel(3);
    }
  }

  const handleContentChange = (content) => {
    setNoteContent(content);
  };

  const saveNote = async () => {
    setIsSaving(true);

    try {
      const reminders = reminderDate ? [new Date(reminderDate)] : [];

      const noteData = {
        title: title.trim(),
        content: noteContent,
        checklist: isListOpen
          ? checklist.filter((item) => item.text.trim())
          : [],
        noteType: isListOpen ? "checklist" : "text",
        color: backgroundColor || "transparent",
        labels: onLabelSelect,
        pinned: pin,
        archived: archived,
        reminders: reminders,
      };

      const res = await axios.post(
        "http://localhost:4000/api/notes",
        noteData,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        console.log("Note saved successfully");
        alert("Note saved successfully!");
        resetForm();
      }
    } catch (err) {
      console.log("Error in savong note: ", err);
      if (err.response) {
        alert(`Failed to save note: ${err.response.data.err}`);
      } else {
        alert("Failed to save note. Please check your connection.");
      }
    } finally {
      setIsSaving(false);
    }
  };

  const resetForm = () => {
    setToggle(false);
    setExpansionLevel(0);
    setTitle("");
    setNoteContent({ raw: null, plainText: "", length: 0 });
    setEditorKey((prev) => prev + 1);
    if (titleRef.current) {
      titleRef.current.value = "";
      titleRef.current.style.height = "auto";
    }
    setBackgroundColor("");
    setIsPaletteOpen(false);
    setOnLabelSelect([]);
    setIsReminderOpen(false);
    setIsListOpen(false);
    setChecklist([{ text: "", done: false }]);
    setReminderDate("");
    setPin(false);
    setArchived(false);
  };

  return (
    <div
      className={`flex ${
        toggle && "flex-col gap-2 border  border-gray-300"
      } items-center  p-3 rounded shadow-sm shadow-[#1b2828] w-[750px] h-auto transition-all duration-300 ease-in-out border border-gray-300 transition-border`}
      style={{ backgroundColor }}
    >
      {toggle && (
        <div className="flex flex-1 w-full h-auto transition-all duration-300 ease-in-out">
          <textarea
            ref={titleRef}
            onChange={(e) => {
              setTitle(e.target.value);
              handleTitleInput();
            }}
            className="flex-1 bg-transparent text-white text-lg  overflow-y-auto placeholder-gray-200 border-none outline-none focus:outline-none transition-all duration-300 ease-in-out resize-none"
            placeholder="Title"
            rows={1}
            maxLength={250}
          />

          <div className="flex justify-center  relative group mr-2 transition-all duration-300 ease-in-out">
            <button
              onClick={() => setPin((pin) => !pin)}
              className="flex  justify-center cursor-pointer p-1 ml-2 transition duration-300 ease-in-out"
            >
              <FontAwesomeIcon
                icon={faThumbtack}
                className={`text-lg  ${
                  pin ? "text-gray-200" : "text-gray-400"
                }  hover:text-gray-300 transition duration-300 ease-in-out`}
              />
            </button>
            <span className="absolute bg-[#1f3a3b] bottom-full left-1/2 -translate-x-1/2 translate-y-7 mb-1 px-2 py-1 text-gray-200 text-xs rounded opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out whitespace-nowrap">
              {!pin ? "Pin" : "Unpin"}
            </span>
          </div>
          <div className="flex justify-center  relative group transition-all duration-300 ease-in-out">
            <button
              onClick={resetForm}
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

      {!isListOpen && (
        <RichTextEditor
          key={editorKey}
          expansionLevel={expansionLevel}
          toggle={toggle}
          handleToggle={handleToggle}
          handleExpansion={handleExpansion}
          onContentChange={handleContentChange}
        />
      )}

      {isListOpen && (
        <ListArea checklist={checklist} setChecklist={setChecklist} />
      )}
      {toggle && <LabelsDiv onLabelSelect={onLabelSelect} />}

      {!toggle && (
        <div className="relative group ml-2 transition-all duration-300 ease-in-out">
          <button
            onClick={() => {
              setIsListOpen((prev) => !prev);
              setToggle((prev) => !prev);
            }}
            className="flex items-center justify-center cursor-pointer  p-1 transition duration-300 ease-in-out"
          >
            <FontAwesomeIcon
              icon={faSquareCheck}
              className="text-xl text-gray-200 hover:shadow-lg  transition duration-300 ease-in-out"
            />
          </button>
          <span className="absolute bg-[#1f3a3b] bottom-full left-1/2 -translate-x-1/2 translate-y-7 mb-1 px-2 py-1 text-gray-200 text-xs rounded opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out whitespace-nowrap">
            New list
          </span>
        </div>
      )}

      {toggle && (
        <div className="flex w-full items-center transition-all duration-300 ease-in-out">
          <div className="flex flex-1 items-center gap-2.5">
            <BgOptions
              isOpen={isPaletteOpen}
              setIsLabelOpen={setIsLabelOpen}
              currentColor={backgroundColor}
              setIsOpen={setIsPaletteOpen}
              onColorSelect={setBackgroundColor}
            />
            <LabelOptions
              islabelOpen={islabelOpen}
              setIsLabelOpen={setIsLabelOpen}
              setIsPaletteOpen={setIsPaletteOpen}
              onLabelSelect={onLabelSelect}
              setOnLabelSelect={setOnLabelSelect}
              labels={labels}
              loading={labelLoading}
              error={labelError}
            />
            <Archive archived={archived} setArchived={setArchived} />
            <Reminder
              isRemiderOpen={isRemiderOpen}
              setIsReminderOpen={setIsReminderOpen}
              reminderDate={reminderDate}
              setReminderDate={setReminderDate}
            />
          </div>

          <button
            type="button"
            onClick={saveNote}
            disabled={isSaving}
            className="w-[80px] h-[35px] bg-gradient-to-r from-cyan-500 to-[#25879f] text-white font-semibold rounded cursor-pointer shadow-lg hover:scale-[1.02] transition-transform duration-200"
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      )}
    </div>
  );
}
