import NoteInput from "../components/notes/NoteInput";

import NoteCard from "../components/notes/display/NoteCard";

import { useSearch } from "../contexts/SearchContext";

import useSearchNotes from "../hooks/useSearchNotes";





export default function Search(){



  const { query } = useSearch();



  const {

    data,

    loading,

    error,

  } = useSearchNotes(query);






  if(loading){


    return (

      <div className="p-6 text-gray-400">


        Loading...


      </div>

    );


  }






  if(error){


    return (

      <div className="p-6 text-red-400">


        Error searching notes


      </div>

    );


  }








  return (


    <>



      <div className="flex justify-center items-center w-full h-auto">


        <NoteInput />


      </div>








      <div className="flex justify-center items-center w-full h-auto">


        <div className="p-6">



          {


            data.length === 0

            ?

            (

              <div className="text-gray-400">


                No matching notes found.


              </div>

            )


            :


            (

              data.map((note)=>(


                <NoteCard

                  key={note._id}

                  note={note}

                />


              ))

            )


          }



        </div>


      </div>



    </>


  );



}