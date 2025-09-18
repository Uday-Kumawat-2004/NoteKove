// src/components/NotesBoard.jsx
import NoteCard from "./NoteBoardCompo/NoteCard";
import { useGetNotes } from "../hooks/useNoteApi";
import useSearchNotes from "../hooks/useSearchNotes";

export default function NotesBoard({
  currentLabelId,
  showTrashed = false,
  showArchived = false,
  searchQuery = "",
}) {
  // ✅ if we have a query → useSearchNotes
  const {
    data: searchData,
    loading: searchLoading,
    error: searchError,
  } = useSearchNotes(searchQuery);

  // ✅ if no query → useGetNotes
  const url = showTrashed
    ? "http://localhost:4000/api/notes?trashed=true"
    : showArchived
    ? "http://localhost:4000/api/notes?archived=true"
    : "http://localhost:4000/api/notes";

  const {
    data: notesData,
    loading: notesLoading,
    error: notesError,
  } = useGetNotes(url);

  // ---------------- DATA SOURCE ----------------
  const loading = searchQuery ? searchLoading : notesLoading;
  const error = searchQuery ? searchError : notesError;
  let data = searchQuery ? searchData : notesData;

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
        {searchQuery ? "No matching notes found." : "No notes available."}
      </div>
    );
  }

  // ---------------- FILTERING (labels / archive / trash) ----------------
  let filteredNotes = data;

  if (currentLabelId) {
    filteredNotes = filteredNotes.filter((note) =>
      note.labels?.some((label) =>
        typeof label === "string"
          ? label === currentLabelId
          : label._id === currentLabelId
      )
    );
  }

  if (showArchived) {
    filteredNotes = filteredNotes.filter((note) => note.archived === true);
  } else if (showTrashed) {
    filteredNotes = filteredNotes.filter((note) => note.trashed === true);
  } else {
    filteredNotes = filteredNotes.filter(
      (note) => !note.archived && !note.trashed
    );
  }

  // ---------------- PINNED + OTHERS ----------------
  const pinnedNotes = filteredNotes.filter((item) => item.pinned);
  const otherNotes = filteredNotes.filter((item) => !item.pinned);

  return (
    <div className="flex flex-col justify-center items-center w-full h-auto">
      {pinnedNotes.length > 0 && (
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

      {filteredNotes.length === 0 && (
        <div className="text-gray-400 mt-6">
          {searchQuery ? "No matching notes found." : "No notes available."}
        </div>
      )}
    </div>
  );
}
