import useGetNotes from "../hooks/useGetNotes";
import NoteCard from "./NoteBoardCompo/NoteCard";

export default function NotesBoard() {
  const { data, error, loading } = useGetNotes(
    "http://localhost:4000/api/notes"
  );
  const pinnedNotes = data.filter((item) => item.pinned);
  const otherNotes = data.filter((item) => !item.pinned);

  console.log(data, pinnedNotes, otherNotes);
  return (
    <div
      className={`flex flex-col justify-center items-center w-full h-auto`}
    >
      {pinnedNotes.length > 0 && (
        <>
          <h2 className="flex-1 text-xs font-bold tracking-wide w-[750px]  text-gray-300 mb-4 mt-10">
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
