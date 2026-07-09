import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faThumbtack,
  faBell,
  faTrash,
  faEdit,
  faUndo,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

import draftToHtml from "draftjs-to-html";
import DOMPurify from "dompurify";

import { useState } from "react";

import ChecklistPreview from "./ChecklistPreview";
import EditingFeild from "./EditingFeild";

import { useUpdateNote } from "../../../hooks/useNoteApi";

import {
  trashNote,
  restoreNote as restoreNoteService,
  permanentDeleteNote,
} from "../../../services/noteService";



function formatReminder(reminder) {

  try {

    const date = new Date(reminder);

    return date.toLocaleString([], {

      year:"numeric",

      month:"short",

      day:"numeric",

      hour:"2-digit",

      minute:"2-digit",

    });

  }
  catch {

    return reminder;

  }

}




export default function NoteCard({ note }) {


  const [showModal,setShowModal] = useState(false);

  const [restoring,setRestoring] = useState(false);

  const [deleting,setDeleting] = useState(false);



  const { updateNote } = useUpdateNote();



  const openModal = ()=>{

    setShowModal(true);

  };




  const togglePin = async()=>{

    try{

      await updateNote(

        note._id,

        {
          pinned:!note.pinned
        }

      );

    }
    catch(err){

      console.error(
        "Pin update failed",
        err
      );

    }

  };





  const moveToTrash = async()=>{

    setDeleting(true);

    try{

      await trashNote(note._id);

    }
    catch(err){

      console.error(
        "Trash failed",
        err
      );

    }
    finally{

      setDeleting(false);

    }

  };






  const restoreNote = async()=>{

    setRestoring(true);


    try{

      await restoreNoteService(
        note._id
      );

    }
    catch(err){

      console.error(
        "Restore failed",
        err
      );

    }
    finally{

      setRestoring(false);

    }

  };







  const permanentlyDelete = async()=>{

    setDeleting(true);


    try{

      await permanentDeleteNote(
        note._id
      );

    }
    catch(err){

      console.error(
        "Permanent delete failed",
        err
      );

    }
    finally{

      setDeleting(false);

    }


  };







  const hasChecklist =

    note.noteType === "checklist" &&

    note.checklist &&

    note.checklist.length > 0;





  const firstReminder =

    Array.isArray(note.reminders) &&

    note.reminders.length > 0

    ?

    note.reminders[0]

    :

    null;






  const labels =

    note.labels && note.labels.length > 0

    ?

    note.labels.map(

      label =>

        typeof label === "string"

        ?

        {
          name:label,
          _id:label
        }

        :

        label

    )

    :

    [];







  return (


    <div

      className="flex flex-col group w-750px items-center p-1.5 mb-6 border border-gray-200"

      style={{
        background: note.color || "transparent"
      }}

    >




      <div className="flex flex-1 w-full pb-2.5">


        <div

          className="flex-1 text-gray-200 text-lg font-medium wrap-break-words overflow-hidden"

          onClick={openModal}

        >

          {note.title}


        </div>





        <button

          onClick={togglePin}

          className="p-1 ml-2"

        >

          <FontAwesomeIcon

            icon={faThumbtack}

            className={`text-lg cursor-pointer ${
              
              note.pinned

              ?

              "text-gray-200"

              :

              "text-gray-400"

            }`}

          />


        </button>


      </div>








      <div

        className="w-full text-gray-200 text-md whitespace-pre-wrap wrap-break-words overflow-hidden max-h-140 relative"

        onClick={openModal}

      >



        {

          hasChecklist

          ?

          (

            <ChecklistPreview

              checklist={note.checklist}

            />

          )

          :

          note.content?.raw?.blocks?.length > 0

          ?

          (

            <div

              className="line-clamp-10"

              dangerouslySetInnerHTML={{

                __html: DOMPurify.sanitize(

                  draftToHtml(note.content.raw)

                )

              }}

            />

          )

          :

          (

            <span className="text-gray-400">

              No Content

            </span>

          )

        }



      </div>









      <div className="flex flex-wrap w-full gap-5 pt-2 items-center mt-2 mb-2">


        {firstReminder && (


          <div className="flex items-center border-2 border-[#cac4ce] px-2 py-1 rounded-2xl text-[#cac4ce] text-sm">


            <FontAwesomeIcon

              icon={faBell}

              className="mr-1"

            />


            {formatReminder(firstReminder)}


          </div>

        )}






        {

          labels.map(

            label=>(

              <div

                key={label._id}

                className="text-sm border-2 border-[#cac4ce] px-2 py-1 text-[#cac4ce] rounded-2xl"

              >

                {label.name}

              </div>

            )

          )

        }


      </div>








      <div className="flex justify-center items-center w-full">



        {!note.trashed ? (

          <>


            <button

              onClick={moveToTrash}

              disabled={deleting}

              className="text-gray-200 w-full px-10 py-1 hover:text-red-300"

            >

              {

                deleting

                ?

                "Deleting..."

                :

                "Move to trash"

              }


              <FontAwesomeIcon

                icon={faTrash}

                className="ml-2"

              />


            </button>





            <button

              onClick={openModal}

              className="text-gray-200 w-full px-10 py-1 hover:text-blue-300"

            >

              Edit note


              <FontAwesomeIcon

                icon={faEdit}

                className="ml-2"

              />


            </button>



          </>

        )

        :

        (

          <>


            <button

              onClick={restoreNote}

              disabled={restoring}

              className="text-gray-200 w-full px-10 py-1 hover:text-green-300"

            >


              {

                restoring

                ?

                "Restoring..."

                :

                "Restore"

              }


              <FontAwesomeIcon

                icon={faUndo}

                className="ml-2"

              />


            </button>





            <button

              onClick={permanentlyDelete}

              disabled={deleting}

              className="text-gray-200 w-full px-10 py-1 hover:text-red-400"

            >

              Delete Permanently


              <FontAwesomeIcon

                icon={faTimesCircle}

                className="ml-2"

              />


            </button>


          </>

        )}


      </div>









      {showModal && !note.trashed && (


        <div className="fixed top-0 left-0 w-full h-full bg-gray-800/90 backdrop-blur-xs z-50 overflow-y-auto">


          <div className="min-h-full flex justify-center items-center p-4">


            <EditingFeild

              existingData={note}

              closeModal={()=>setShowModal(false)}

            />


          </div>


        </div>


      )}



    </div>


  );

}