import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArchive } from "@fortawesome/free-solid-svg-icons";

export default function Archive({
    archived,
    setArchived
}) {
  return (
    <div className="relative group/archive ml-2 transition-all duration-300 ease-in-out">
      <button
        onClick={() => {
          setArchived((prev) => {
            const newState = !prev;
            return newState;
          });
        }}
        className="flex items-center justify-center cursor-pointer p-1 transition duration-300 ease-in-out"
      >
        <FontAwesomeIcon
          icon={faArchive}
          className={`text-xl ${
            archived ? "text-gray-400" : "text-gray-200"
          } hover:shadow-lg transition duration-300 ease-in-out`}
        />
      </button>

      {
        <span className="absolute bg-[#1f3a3b] bottom-full left-1/2 -translate-x-6 translate-y-7 mb-1 px-2 py-1 text-gray-200 text-xs rounded opacity-0 group-hover/archive:opacity-100 group-hover/archive:translate-y-14 transition-all duration-300 ease-in-out whitespace-nowrap">
          {!archived ? "Archive" : "Unarchive"}
        </span>
      }
    </div>
  );
}
