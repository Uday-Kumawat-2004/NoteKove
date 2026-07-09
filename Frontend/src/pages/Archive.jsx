import NotesBoard from "../components/notes/NotesBoard";





export default function Archive(){



  return (


    <div className="flex justify-center items-center w-full h-auto">



      <NotesBoard

        showArchived={true}

      />



    </div>


  );



}