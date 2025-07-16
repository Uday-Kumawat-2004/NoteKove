import SideDrawer from "../components/SideDrawer";
import Header from "../components/Header";
export default function Home() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      
      <Header />

      
      <div className="flex flex-1 overflow-hidden">

        <div>
          <SideDrawer />
        </div>

        
        <div className="flex-1 overflow-y-auto p-4 text-white">
          <h1 className="text-2xl font-semibold">Welcome to NoteKove</h1>
          <p className="mt-4 text-gray-300">Start by creating your notes or to-dos.</p>
        </div>
      </div>
    </div>
  );
}