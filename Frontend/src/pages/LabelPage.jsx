import { useParams } from "react-router-dom";


import NoteInput from "../components/notes/NoteInput";

import NotesBoard from "../components/notes/NotesBoard";


import { useGetLabels } from "../hooks/useLabelApi";






export default function LabelPage(){



  const { id } = useParams();




  const {

    data: labels,

    loading,

    error,

  } = useGetLabels();







  if(loading){


    return (

      <div className="text-gray-300">

        Loading...

      </div>

    );


  }







  if(error){


    return (

      <div className="text-red-400">

        Error loading labels

      </div>

    );


  }







  const currentLabel = labels.find(

    (label)=> label._id === id

  );







  return (


    <>



      <div className="flex justify-center items-center w-full h-auto">



        {

          currentLabel

          ?

          (

            <NoteInput

              defaultLabels={[currentLabel]}

            />

          )


          :


          (

            <div className="text-gray-300">

              Label not found

            </div>

          )

        }



      </div>








      <div className="flex justify-center items-center w-full h-auto">



        <NotesBoard

          currentLabelId={id}

        />



      </div>




    </>


  );


}