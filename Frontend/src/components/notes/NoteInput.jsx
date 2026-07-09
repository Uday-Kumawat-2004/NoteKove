import {
  faThumbtack,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faSquareCheck } from "@fortawesome/free-regular-svg-icons";

import {
  useEffect,
  useRef,
  useState,
} from "react";


import BgOptions from "./editor/BgOptions";
import LabelsDiv from "./editor/LabelsDiv";
import LabelOptions from "./editor/LabelOptions";
import ListArea from "./editor/ListArea";
import Archive from "./editor/Archive";
import Reminder from "./editor/Reminder";
import RichTextEditor from "./editor/RichTextEditor";


import { useGetLabels } from "../../hooks/useLabelApi";
import { createNote } from "../../services/noteService";


export default function NoteInput({
  defaultLabels = [],
}) {

  const [toggle, setToggle] = useState(false);

  const [expansionLevel, setExpansionLevel] = useState(0);


  const [pin, setPin] = useState(false);

  const [archived, setArchived] = useState(false);


  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  const [islabelOpen, setIsLabelOpen] = useState(false);

  const [isReminderOpen, setIsReminderOpen] = useState(false);


  const [backgroundColor, setBackgroundColor] = useState("");


  const [onLabelSelect, setOnLabelSelect] = useState([]);


  const [isListOpen, setIsListOpen] = useState(false);


  const [checklist, setChecklist] = useState([
    {
      text: "",
      done: false,
    },
  ]);


  const [reminderDate, setReminderDate] = useState("");


  const [title, setTitle] = useState("");


  const [noteContent, setNoteContent] = useState({
    raw: null,
    plainText: "",
    length: 0,
  });


  const [editorKey, setEditorKey] = useState(0);


  const [isSaving, setIsSaving] = useState(false);



  const {
    data: labels,
    error: labelError,
    loading: labelLoading,
  } = useGetLabels();



  const titleRef = useRef(null);



  function handleToggle() {

    if (!toggle) {

      setToggle(true);

    }

  }



  useEffect(() => {

    if (defaultLabels.length > 0) {

      setOnLabelSelect(defaultLabels);

    }

  }, [defaultLabels]);



  function handleTitleInput() {

    const textarea = titleRef.current;


    if (textarea) {

      textarea.style.height = "auto";

      textarea.style.height =
        `${textarea.scrollHeight}px`;

    }

  }



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



  function handleContentChange(content) {

    setNoteContent(content);

  }



  async function saveNote() {

    if (isSaving) return;


    const emptyTitle =
      !title.trim();


    const emptyContent =
      !noteContent.plainText?.trim();


    const emptyChecklist =
      checklist.every(
        item => !item.text.trim()
      );


    if (
      emptyTitle &&
      emptyContent &&
      emptyChecklist
    ) {

      return;

    }



    setIsSaving(true);


    try {

      const noteData = {

        title: title.trim(),


        content: noteContent,


        checklist: isListOpen
          ? checklist.filter(
              item => item.text.trim()
            )
          : [],


        noteType: isListOpen
          ? "checklist"
          : "text",


        color:
          backgroundColor ||
          "transparent",


        labels: onLabelSelect,


        pinned: pin,


        archived,


        reminders: reminderDate
          ? [new Date(reminderDate)]
          : [],

      };


      await createNote(noteData);


      resetForm();


    } catch (err) {


      console.error(
        "Create note failed:",
        err
      );


    } finally {


      setIsSaving(false);


    }

  }



  function resetForm() {

    setToggle(false);

    setExpansionLevel(0);

    setTitle("");


    setNoteContent({
      raw: null,
      plainText: "",
      length: 0,
    });


    setEditorKey(
      prev => prev + 1
    );


    if (titleRef.current) {

      titleRef.current.value = "";

      titleRef.current.style.height = "auto";

    }


    setBackgroundColor("");

    setIsPaletteOpen(false);

    setOnLabelSelect([]);

    setIsReminderOpen(false);

    setIsListOpen(false);


    setChecklist([
      {
        text: "",
        done: false,
      },
    ]);


    setReminderDate("");

    setPin(false);

    setArchived(false);

  }



  return (

    <div

      className={`flex ${
        toggle &&
        "flex-col gap-2 border border-gray-300"
      } items-center p-3 rounded shadow-sm shadow-[#1b2828] w-[750px] h-auto transition-all duration-300 ease-in-out border border-gray-300`}


      style={{backgroundColor}}

    >


      {toggle && (

        <div className="flex flex-1 w-full">


          <textarea

            ref={titleRef}

            onChange={(e)=>{

              setTitle(e.target.value);

              handleTitleInput();

            }}

            className="flex-1 bg-transparent text-white text-lg overflow-y-auto placeholder-gray-200 border-none outline-none resize-none"

            placeholder="Title"

            rows={1}

            maxLength={250}

          />


          <button
            onClick={()=>setPin(prev=>!prev)}
          >

            <FontAwesomeIcon

              icon={faThumbtack}

              className={
                pin
                ?
                "text-gray-200"
                :
                "text-gray-400"
              }

            />

          </button>


          <button onClick={resetForm}>

            <FontAwesomeIcon

              icon={faXmark}

              className="text-xl text-gray-200 hover:text-red-400"

            />

          </button>


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

        <ListArea

          checklist={checklist}

          setChecklist={setChecklist}

        />

      )}



      {toggle && (

        <LabelsDiv

          onLabelSelect={onLabelSelect}

        />

      )}



      {!toggle && (

        <button

          onClick={()=>{

            setIsListOpen(prev=>!prev);

            setToggle(prev=>!prev);

          }}

        >

          <FontAwesomeIcon

            icon={faSquareCheck}

            className="text-xl text-gray-200"

          />

        </button>

      )}




      {toggle && (

        <div className="flex w-full items-center">


          <div className="flex flex-1 gap-2">


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



            <Archive

              archived={archived}

              setArchived={setArchived}

            />



            <Reminder

              isReminderOpen={isReminderOpen}

              setIsReminderOpen={setIsReminderOpen}

              reminderDate={reminderDate}

              setReminderDate={setReminderDate}

            />


          </div>



          <button

            onClick={saveNote}

            disabled={isSaving}

            className="w-[80px] h-[35px] bg-gradient-to-r from-cyan-500 to-[#25879f] text-white rounded"

          >

            {
              isSaving
              ?
              "Saving..."
              :
              "Save"
            }

          </button>


        </div>

      )}

    </div>

  );

}