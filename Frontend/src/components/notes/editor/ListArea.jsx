import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function ListArea({ checklist, setChecklist }) {
  return (
    <div className="w-full overflow-y-auto max-h-[550px]">
      {checklist.map((item, index) => (
        !item.done && <div
          key={index}
          className="flex items-center w-full gap-2 border-t border-b pt-1.5 pb-1.5 border-gray-200 overflow-y-auto max-h-[400px]"
        >
          <div className="ml-2 mr-1.5">
            <label className="inline-flex items-center cursor-pointer select-none">
              <input
                type="checkbox"
                checked={item.done}
                onChange={() => {
                  const updated = [...checklist];
                  updated[index].done = !updated[index].done;
                  setChecklist(updated);
                  console.log(checklist);
                }}
                className="sr-only"
              />
              <div
                className={`w-5 h-5 rounded border-2 transition-all duration-300 flex items-center justify-center ${
                  item.done ? " border-gray-200" : "border-gray-300"
                }`}
              >
                {item.done && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            </label>
          </div>

          <div className="flex-1">
            <textarea
              rows={1}
              value={item.text}
              onChange={(e) => {
                const updated = [...checklist];
                updated[index].text = e.target.value;
                setChecklist(updated);
              }}
              
              className="w-full text-white placeholder-gray-200 border-none outline-none bg-transparent overflow-y-auto resize-none transition-all duration-300 ease-in-out"
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              maxLength={150}
            />
          </div>

          <div className="mr-2 flex items-center gap-1">
            <button
              type="button"
              onClick={() => {
                const updated = [...checklist];
                updated.splice(index, 1);
                setChecklist(updated);
              }}
              className="text-xs text-gray-200 hover:text-red-200"
            >
              <FontAwesomeIcon icon={faTrash} className="text-base" />
            </button>
          </div>
        </div>
      ))}

      {/* Add New Item */}
      <div className="mt-2 flex justify-center">
        <button
          type="button"
          onClick={() => {
            setChecklist([...checklist, { text: "", done: false }]);
            console.log(checklist);
          }}
          className="text-sm text-gray-200 hover:text-gray-300 transition duration-300"
        >
          <span>
            <FontAwesomeIcon icon={faPlus} />
          </span>{" "}
          Add Item
        </button>
      </div>

      {/* Checked Items */}
      <div className="flex flex-col w-full h-auto border-t mt-5 p-2 pt-1 border-gray-500">
        <p
        className="w-full text-gray-300 font-[500] mb-3.5 font-stretch-semi-condensed"
        >Completed items</p>
        {checklist.map((item, index) => (
        item.done && <div
          key={index}
          className="flex items-center w-full gap-2 border-t border-b pt-1.5 pb-1.5 border-gray-400 overflow-y-auto max-h-[400px]"
        >
          <div className="ml-2 mr-1.5">
            <label className="inline-flex items-center cursor-pointer select-none">
              <input
                type="checkbox"
                checked={item.done}
                onChange={() => {
                  const updated = [...checklist];
                  updated[index].done = !updated[index].done;
                  setChecklist(updated);
                  console.log(checklist);
                }}
                className="sr-only"
              />
              <div
                className={`w-5 h-5 rounded border-2 transition-all duration-300 flex items-center justify-center border-gray-400`}
              >
                {item.done && (
                  <svg
                    className="w-3 h-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            </label>
          </div>

          <div className="flex-1">
            <textarea
              rows={1}
              value={item.text}
              onChange={(e) => {
                const updated = [...checklist];
                updated[index].text = e.target.value;
                setChecklist(updated);
              }}
              
              className="w-full text-gray-400 border-none outline-none bg-transparent overflow-y-auto resize-none transition-all duration-300 ease-in-out line-through"
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              maxLength={150}
            />
          </div>

          <div className="mr-2 flex items-center gap-1">
            <button
              type="button"
              onClick={() => {
                const updated = [...checklist];
                updated.splice(index, 1);
                setChecklist(updated);
              }}
              className="text-xs text-gray-400 hover:text-red-200"
            >
              <FontAwesomeIcon icon={faTrash} className="text-base" />
            </button>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}
