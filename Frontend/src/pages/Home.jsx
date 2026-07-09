import NoteInput from "../components/notes/NoteInput";

import NotesBoard from "../components/notes/NotesBoard";



export default function Home(){


  return (


    <>


      <div className="flex justify-center items-center w-full h-auto">


        <NoteInput />


      </div>




      <div className="flex justify-center items-center w-full h-auto">


        <NotesBoard />


      </div>


    </>


  );


}