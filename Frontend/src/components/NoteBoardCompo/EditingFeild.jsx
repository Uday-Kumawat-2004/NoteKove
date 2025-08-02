import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState, useEffect } from "react";
import BgOptions from "../NoteInputCompo/BgOptions";
import LabelsDiv from "../NoteInputCompo/LabelsDiv";
import LabelOptions from "../NoteInputCompo/LabelOptions";
import { useGetLabels } from "../../hooks/useLabelApi";
import ListArea from "../NoteInputCompo/ListArea";
import Archive from "../NoteInputCompo/Archive";
import Reminder from "../NoteInputCompo/Reminder";
import RichTextEditor from "../NoteInputCompo/RichTextEditor";
import { useUpdateNote } from "../../hooks/useNoteApi";
export default function EditingFeild({ existingData, closeModal }) {
  const [title, setTitle] = useState(existingData.title || "");
  const [noteContent, setNoteContent] = useState(
    existingData.content || {
      raw: null,
      plainText: "",
      length: 0,
    }
  );
  const [checklist, setChecklist] = useState(existingData.checklist || []);
  const [pin, setPin] = useState(existingData.pinned || false);
  const [backgroundColor, setBackgroundColor] = useState(
    existingData.color || "transparent"
  );
  const [onLabelSelect, setOnLabelSelect] = useState(existingData.labels || []);
  const [archived, setArchived] = useState(existingData.archived || false);
  const [reminderDate, setReminderDate] = useState(
    existingData.reminders?.[0] || ""
  );
  const [isListOpen, _setIsListOpen] = useState(
    existingData.noteType === "checklist"
  );
  const [expansionLevel, setExpansionLevel] = useState(0);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [islabelOpen, setIsLabelOpen] = useState(false);
  const [isRemiderOpen, setIsReminderOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const titleRef = useRef(null);
  const { updateNote } = useUpdateNote();

  const {
    data: labels,
    error: labelError,
    loading: labelLoading,
  } = useGetLabels("http://localhost:4000/api/createLabel");

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.style.height = "auto";
      titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
    }
  }, [title]);

  const handleContentChange = (content) => {
    setNoteContent(content);
  };

  const handleExpansion = (length) => {
    if (length <= 250) setExpansionLevel(0);
    else if (length <= 600) setExpansionLevel(1);
    else if (length <= 1200) setExpansionLevel(2);
    else setExpansionLevel(3);
  };

  const saveChanges = async () => {
    setIsSaving(true);
    try {
      const updatedNote = {
        title: title.trim(),
        content: noteContent,
        checklist: isListOpen ? checklist : [],
        noteType: isListOpen ? "checklist" : "text",
        color: backgroundColor,
        labels: onLabelSelect,
        pinned: pin,
        archived,
        reminders: reminderDate ? [new Date(reminderDate)] : [],
      };
      await updateNote(existingData._id, updatedNote);
      alert("Note updated successfully!");
      closeModal();
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update note. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      className="flex flex-col group gap-2 border border-gray-300 p-4 w-[750px] bg-[#1a1a1a] rounded shadow-lg"
      style={{ backgroundColor }}
    >
      <div className="flex w-full">
        <textarea
          ref={titleRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 bg-transparent text-white text-lg resize-none overflow-hidden border-none outline-none"
          placeholder="Title"
        />
        <div className="flex items-start justify-center gap-4 ml-2">
          <div className="relative group/pin">
            <button onClick={() => setPin(!pin)}>
              <FontAwesomeIcon
                icon={faThumbtack}
                className={`text-lg cursor-pointer ${
                  pin ? "text-white" : "text-gray-400"
                }`}
              />
            </button>
            <span className="absolute bg-gray-700 text-white text-xs px-2 py-1 rounded -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover/pin:opacity-100 transition-all">
              {pin ? "Unpin" : "Pin"}
            </span>
          </div>

          <div className="relative group/close">
            <button onClick={closeModal}>
              <FontAwesomeIcon
                icon={faXmark}
                className="text-xl text-gray-200 hover:text-red-400 cursor-pointer"
              />
            </button>
            <span className="absolute bg-gray-700 text-white text-xs px-2 py-1 rounded -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover/close:opacity-100 transition-all">
              Close
            </span>
          </div>
        </div>
      </div>
      {console.log("initialContent from EditingField:", noteContent)}

      {!isListOpen ? (
        <RichTextEditor
          expansionLevel={expansionLevel}
          toggle={true}
          handleToggle={() => {}}
          handleExpansion={handleExpansion}
          onContentChange={handleContentChange}
          initialContent={noteContent}
        />
      ) : (
        <ListArea checklist={checklist} setChecklist={setChecklist} />
      )}

      <LabelsDiv onLabelSelect={onLabelSelect} />

      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <BgOptions
            isOpen={isPaletteOpen}
            setIsOpen={setIsPaletteOpen}
            setIsLabelOpen={setIsLabelOpen}
            currentColor={backgroundColor}
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
          onClick={saveChanges}
          disabled={isSaving}
          className="w-[80px] border-2 border-[#38caef] h-[30px] flex items-center justify-center cursor-pointer relative overflow-hidden transition-all duration-300 ease-in-out hover:scale-95 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#38caef] before:to-[#38caef] before:transition-all before:duration-300 before:ease-in-out before:z-[-1] hover:before:left-0 text-gray-100"
        >
          {isSaving ? "Updating..." : "Update"}
        </button>
      </div>
    </div>
  );
}
