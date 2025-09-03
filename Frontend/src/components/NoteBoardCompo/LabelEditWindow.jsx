import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faTrash,
  faPen,
  faCheck,
  faXmark,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useGetLabels } from "../../hooks/useLabelApi";

function LabelEditWindow({ onClose }) {
  const {
    data: labels,
    loading,
    error,
    refetch,
  } = useGetLabels("http://localhost:4000/api/labels");

  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [newLabel, setNewLabel] = useState("");

  // Filter labels
  const filteredLabels = labels?.filter((label) =>
    label.name.toLowerCase().includes(search.toLowerCase())
  );

  // Add new label
  const handleAddLabel = async () => {
    if (!newLabel.trim()) return;
    try {
      await axios.post(
        "http://localhost:4000/api/labels",
        { labelName: newLabel },
        { withCredentials: true }
      );
      setNewLabel("");
      refetch();
    } catch (err) {
      console.error("Add label failed:", err);
    }
  };

  // Delete label
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/labels/${id}`, {
        withCredentials: true,
      });
      refetch();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // Update label
  const handleUpdate = async (id) => {
    try {
      await axios.put(
        `http://localhost:4000/api/labels/${id}`,
        { newName: editValue },
        { withCredentials: true }
      );
      setEditingId(null);
      refetch();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <div className="bg-white/5 border border-gray-400/20 shadow-sm shadow-gray-200/30 w-[380px] h-auto p-4 text-white rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center h-[24px]">
        <button
          className="w-[24px] h-[24px] flex items-center justify-center"
          onClick={onClose}
        >
          <FontAwesomeIcon
            icon={faChevronLeft}
            size="sm"
            className="cursor-pointer text-gray-400 hover:text-gray-200"
          />
        </button>
        <h1 className="text-gray-300 text-sm font-medium">Edit Labels</h1>
        <div className="w-[24px] h-[24px]"></div>
      </div>

      {/* Add Label */}
      <div className="flex items-center gap-2 mt-4">
        <input
          type="text"
          placeholder="Add a new label"
          className="flex-1 bg-transparent h-[35px] px-3 border border-[#25879f] focus:outline-none rounded-lg text-sm placeholder:text-gray-400"
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
        />
        <button
          onClick={handleAddLabel}
          className="bg-[#25879f] hover:bg-[#1c6a7c] text-white px-3 py-2 rounded-lg text-sm flex items-center gap-1 cursor-pointer"
        >
          <FontAwesomeIcon icon={faPlus} size="sm" />
        </button>
      </div>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by label name"
        className="bg-transparent mt-3 h-[35px] px-4 border border-[#25879f] focus:outline-none rounded-lg w-full text-sm placeholder:text-gray-400"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* All Labels */}
      <div className="mt-6 overflow-y-auto h-[320px]">
        <h2 className="text-xs text-gray-400 mb-2">All Labels</h2>
        {loading && <p className="text-gray-500 text-sm">Loading...</p>}
        {error && <p className="text-red-500 text-sm">Failed to load labels</p>}

        {filteredLabels?.map((label) => (
          <div
            key={label._id}
            className="group flex items-center justify-between py-2 px-2 hover:bg-gray-700 rounded-md transition-colors duration-200"
          >
            {editingId === label._id ? (
              <div className="flex gap-2 flex-1">
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="flex-1 bg-gray-800 border border-gray-600 rounded px-2 text-sm text-white"
                />
                <button
                  onClick={() => handleUpdate(label._id)}
                  className="text-gray-400 hover:text-gray-200 cursor-pointer transition-colors duration-200"
                >
                  <FontAwesomeIcon icon={faCheck} />
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="text-gray-400 hover:text-gray-200 cursor-pointer transition-colors duration-200"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
            ) : (
              <>
                {/* Trash on left with smooth transition */}
                <button
                  onClick={() => handleDelete(label._id)}
                  className="text-gray-400 hover:text-gray-200 cursor-pointer mr-3 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>

                {/* Label name */}
                <span className="text-sm flex-1">{label.name}</span>

                {/* Edit on right with smooth transition */}
                <button
                  onClick={() => {
                    setEditingId(label._id);
                    setEditValue(label.name);
                  }}
                  className="text-gray-400 hover:text-gray-200 cursor-pointer opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300"
                >
                  <FontAwesomeIcon icon={faPen} />
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LabelEditWindow;
