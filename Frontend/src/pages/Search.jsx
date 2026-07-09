import Header from "../components/header/Header";
import SideDrawer from "../components/sidebar/SideDrawer";
import NoteInput from "../components/NoteInput";
import { useSearch } from "../contexts/SearchContext";
import useSearchNotes from "../hooks/useSearchNotes";
import NoteCard from "../components/NoteBoardCompo/NoteCard";
export default function Search() {
  const { query } = useSearch();
  const { data, loading, error } = useSearchNotes(query);

  if (loading) return <div className="p-6 text-gray-400">Loading...</div>;
  if (error)
    return <div className="p-6 text-red-400">Error searching notes</div>;
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <div>
          <SideDrawer />
        </div>

        <div className="flex-1 overflow-y-auto p-10">
          <div className=" flex justify-center items-center w-full h-auto">
            <NoteInput />
          </div>
          <div className=" flex justify-center items-center w-full h-auto">
            <div className="p-6">
              {data.length === 0 ? (
                <div className="text-gray-400">No matching notes found.</div>
              ) : (
                data.map((note) => <NoteCard key={note._id} note={note} />)
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
