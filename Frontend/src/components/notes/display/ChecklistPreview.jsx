
// Pass the note's checklist array as prop: checklist
export default function ChecklistPreview({ checklist = [] }) {
  // Split into done/undone
  const undone = checklist.filter(item => !item.done);
  const done = checklist.filter(item => item.done);

  return (
    <div className="w-full">
      {/* Unchecked items */}
      {undone.length > 0 && undone.map((item, i) => (
        <div
          key={item.id || item._id || i}
          className="flex items-center w-full gap-2 border-t border-b pt-1.5 pb-1.5 border-gray-200"
        >
          {/* Checkbox */}
          <div className="ml-2 mr-1.5">
            <span className="inline-flex items-center cursor-default select-none">
              <span
                className={`w-5 h-5 rounded border-2 transition-all duration-300 flex items-center justify-center ${
                  item.done ? "border-gray-200" : "border-gray-300 bg-transparent"
                }`}
              >
                {/* Unchecked isn't filled, checked is */}
                {item.done && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
            </span>
          </div>
          {/* Item text (no textarea, just plain text) */}
          <div className="flex-1 text-white text-base break-words">
            {item.text}
          </div>
        </div>
      ))}

      {/* Checked items section */}
      {done.length > 0 && (
        <div className="flex flex-col w-full h-auto border-t mt-5 p-2 pt-1 border-gray-500">
          <p className="w-full text-gray-300 font-[500] mb-3.5 font-stretch-semi-condensed">
            Completed items
          </p>
          {done.map((item, i) => (
            <div
              key={item.id || item._id || i}
              className="flex items-center w-full gap-2 border-t border-b pt-1.5 pb-1.5 border-gray-400"
            >
              <div className="ml-2 mr-1.5">
                <span className="inline-flex items-center cursor-default select-none">
                  <span className="w-5 h-5 rounded border-2 border-gray-400 transition-all duration-300 flex items-center justify-center">
                    {item.done && (
                      <svg
                        className="w-3 h-3 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                </span>
              </div>
              <div className="flex-1 text-gray-400 line-through break-words">
                {item.text}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
