import Header from "../components/Header";
import SideDrawer from "../components/SideDrawer";
import NoteInput from "../components/NoteInput";
import NotesBoard from "../components/NotesBoard";

export default function Labels() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      
      <Header />

      
      <div className="flex flex-1 overflow-hidden">

        <div>
          <SideDrawer />
        </div>

        
        <div className="flex-1 overflow-y-auto p-10">
          <div className=" flex justify-center items-center w-full h-auto">
            
              <NoteInput/>
            
          </div>
          <div className=" flex justify-center items-center w-full h-auto">
            <NotesBoard/>
          </div>
        </div>
      </div>
    </div>
  );
}