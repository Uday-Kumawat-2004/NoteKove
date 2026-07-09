import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTag,
  faChevronLeft,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function LabelOptions({
  islabelOpen,
  setIsLabelOpen,
  setIsPaletteOpen,
  onLabelSelect,
  setOnLabelSelect,
  labels,
  loading,
  error,
}) {
  const [search, setSearch] = useState("");

  const filteredLabels = labels?.filter((label) =>
    label.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="relative  group/label ml-2 transition-all duration-300 ease-in-out">
      <button
        onClick={() => {
          setIsLabelOpen((prev) => {
            const newState = !prev;
            if (newState) {
              setIsPaletteOpen(false);
            }
            return newState;
          });
          setSearch("");
        }}
        className="flex items-center justify-center cursor-pointer p-1 transition duration-300 ease-in-out"
      >
        <FontAwesomeIcon
          icon={faTag}
          className={`text-xl ${
            islabelOpen ? "text-gray-400" : "text-gray-200"
          } hover:shadow-lg transition duration-300 ease-in-out`}
        />
      </button>
      {!islabelOpen && (
        <span className="absolute bg-[#1f3a3b] bottom-full left-1/2 -translate-x-8 translate-y-7 mb-1 px-2 py-1 text-gray-200 text-xs rounded opacity-0 group-hover/label:opacity-100  group-hover/label:translate-y-14 transition-all duration-300 ease-in-out whitespace-nowrap">
          Add labels
        </span>
      )}
      {islabelOpen && (
        <div className="flex flex-col absolute w-[270px] max-h-[300px] bg-gradient-to-br from-[#0b191f] to-[#0f2027] border border-gray-400/20 shadow-sm shadow-gray-200/30 top-full left-1/2 translate-x-2 -translate-y-3 mb-10 px-2 py-1 text-gray-200 text-xs rounded transition-all duration-300 ease-in-out whitespace-nowrap  z-50">
          <div className="flex justify-between items-center h-[24px]">
            <button
              className="w-[24px] h-[24px] flex items-center justify-center cursor-pointer"
              onClick={() => {
                setIsLabelOpen((prev) => !prev);
                setSearch("");
              }}
            >
              <FontAwesomeIcon
                icon={faChevronLeft}
                size="sm"
                style={{ color: "#d1d5db" }}
              />
            </button>
            <h1 className="text-gray-300 text-sm font-medium">Select Labels</h1>
            <div className="w-[24px] h-[24px]"></div>
          </div>
          <input
            type="text"
            placeholder="Search label"
            className="bg-transparent mt-3 h-[25px] px-4 border border-gray-600 focus:outline-none rounded-lg w-full text-sm placeholder:text-gray-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="mt-6 overflow-y-auto max-h-[200px]">
            <h2 className="text-xs text-gray-400 mb-2">All labels</h2>
            {loading && (
              <div className="flex justify-center items-center h-[200px]">
                <div className="w-10 h-10 border-4 border-t-gray-300 border-gray-400 rounded-full animate-spin"></div>
              </div>
            )}
            {error && (
              <p className="text-red-500 text-sm">Failed to load labels</p>
            )}
            {filteredLabels?.map((label) => {
              const isSelected = onLabelSelect.some((i) => i._id === label._id);
              return (
                <div
                  key={label._id}
                  onClick={() =>
                    setOnLabelSelect((prev) =>
                      prev.find((i) => i._id === label._id)
                        ? prev.filter((i) => i._id !== label._id)
                        : [...prev, label]
                    )
                  }
                  className={`flex mb-1.5 items-center justify-between py-2 px-2 rounded-md transition cursor-pointer ${
                    isSelected ? "bg-cyan-600" : "hover:bg-[#25879fb5]"
                  }`}
                >
                  <span className="text-sm">{label.name}</span>
                  {isSelected && (
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-gray-200 text-sm"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
