import NotesBoard from "../components/notes/NotesBoard";





export default function TrashPage(){



  return (


    <div className="flex justify-center items-center w-full h-auto">



      <NotesBoard

        showTrashed={true}

      />



    </div>


  );



}