import { useGetNotes } from "../hooks/useNoteApi";
import NoteCard from "./NoteBoardCompo/NoteCard";

export default function NotesBoard() {
  const { data, error, loading } = useGetNotes("http://localhost:4000/api/notes");
  console.log(data);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[200px]">
        <div className="w-10 h-10 border-4 border-t-gray-300 border-gray-400 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-400 font-semibold mt-4">
        Error fetching notes: {error.message || "Something went wrong."}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-gray-400 font-medium mt-4">
        No notes available.
      </div>
    );
  }

  const pinnedNotes = data.filter((item) => item.pinned && !item.trashed);
  const otherNotes = data.filter((item) => !item.pinned && !item.trashed);

  return (
    <div className="flex flex-col justify-center items-center w-full h-auto">
      {pinnedNotes.length > 0 &&  (
        <>
          <h2 className="text-xs font-bold tracking-wide w-[750px] text-gray-300 mb-4 mt-10">
            PINNED
          </h2>
          <div className="flex-1">
            {pinnedNotes.map((note) => (
              <NoteCard key={note._id} note={note} />
            ))}
          </div>
        </>
      )}

      {otherNotes.length > 0 && (
        <>
          <h2 className="w-[750px] text-xs font-bold tracking-wide text-gray-300 mb-2 mt-10">
            OTHERS
          </h2>
          <div className="flex flex-col gap-4">
            {otherNotes.map((note) => (
              <NoteCard key={note._id} note={note} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
