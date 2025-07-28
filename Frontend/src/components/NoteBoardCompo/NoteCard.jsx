import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack, faBell } from "@fortawesome/free-solid-svg-icons";
import draftToHtml from 'draftjs-to-html';
import DOMPurify from 'dompurify';
import ChecklistPreview from "./ChecklistPreview";

function formatReminder(reminder) {
  try {
    const date = new Date(reminder);
    return date.toLocaleString([], { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  } catch {
    return reminder;
  }
}

export default function NoteCard({ note }) {
  const hasChecklist = note.noteType === "checklist" && note.checklist && note.checklist.length > 0;

  const firstReminder = Array.isArray(note.reminders) && note.reminders.length > 0
    ? note.reminders[0]
    : null;

  const labels = note.labels && note.labels.length > 0
    ? note.labels.map(
        label => typeof label === "string" ? { name: label, _id: label } : label
      )
    : [];

  return (
    <div
      className="flex flex-col w-[750px] items-center p-1.5 mb-6 border border-gray-200"
      style={{ background: note.color || "transparent" }}
    >
      <div className="flex flex-1 w-full pb-2.5">
        <div className="flex-1 text-gray-200 text-lg font-medium break-words overflow-hidden">
          {note.title}
        </div>
        <div className="flex justify-center items-start relative group mr-2">
          <button className="p-1 ml-2" tabIndex={-1} aria-label={note.pinned ? "Unpin" : "Pin"}>
            <FontAwesomeIcon
              icon={faThumbtack}
              className={`text-lg ${note.pinned ? "text-gray-200" : "text-gray-400"}`}
            />
          </button>
          <span className="absolute bg-[#1f3a3b] bottom-full left-1/2 -translate-x-1/2 translate-y-7 mb-1 px-2 py-1 text-gray-200 text-xs rounded opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out whitespace-nowrap">
            {!note.pinned ? "Pin" : "Unpin"}
          </span>
        </div>
      </div>

      <div className="w-full text-gray-200 text-md whitespace-pre-wrap break-words overflow-hidden max-h-40 overflow-y-hidden relative">
        {hasChecklist ? (
          <ChecklistPreview checklist={note.checklist} />
        ) : (
          note.content?.raw && note.content.raw.blocks && note.content.raw.blocks.length > 0 ? (
            <div
              className="line-clamp-[10]"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(draftToHtml(note.content.raw)),
              }}
            />
          ) : (
            <span className="text-gray-400">No Content</span>
          )
        )}
        <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-[note.color||#111] to-transparent pointer-events-none"></div>
      </div>

      <div className="flex flex-wrap w-full gap-2 pt-2 items-center mt-2 mb-2 mr-1 ml-1">
        {firstReminder && (
          <div className="flex items-center border-2 border-[#cac4ce] px-2 py-1 rounded-2xl text-[#cac4ce] text-sm font-medium">
            <FontAwesomeIcon icon={faBell} className="mr-1 text-[#cac4ce]" />
            {formatReminder(firstReminder)}
          </div>
        )}
        {labels.map((label) =>
          <div
            key={label._id || label.name}
            className="text-sm border-2 font-medium border-[#cac4ce] px-2 py-1 text-[#cac4ce] rounded-2xl items-center"
          >
            {label.name}
          </div>
        )}
      </div>
    </div>
  );
}
