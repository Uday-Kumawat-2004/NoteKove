import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette } from "@fortawesome/free-solid-svg-icons";

export default function BgOptions({
  isOpen,
  currentColor,
  setIsOpen,
  onColorSelect,
}) {
  const colorOptions = [
    "#AD2831", "#DF3540", "#001D3D", "#003566",
    "#FFC300", "#FFD60A", "#38B000", "#9EF01A",
  ];

  return (
    <div className="relative group ml-2 transition-all duration-300 ease-in-out">
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="flex items-center justify-center cursor-pointer bg-[#3c6e71] p-1 transition duration-300 ease-in-out"
      >
        <FontAwesomeIcon
          icon={faPalette}
          className={`text-xl ${isOpen ? "text-gray-300" : "text-gray-200"} hover:shadow-lg transition duration-300 ease-in-out`}
        />
      </button>

      {!isOpen && (
        <div className="absolute bg-[#1f3a3b] bottom-full left-1/2 -translate-x-12 translate-y-16 mb-1 px-2 py-1 text-gray-200 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out whitespace-nowrap">
          Background Options
        </div>
      )}

      {isOpen && (
        <div className="absolute bg-[#1f3a3b] bottom-full left-1/2 translate-x-4 translate-y-22 mb-1 px-2 py-1 text-gray-200 text-xs rounded transition-all duration-300 ease-in-out whitespace-nowrap">
          <div className="flex gap-1 p-0.5 w-[172px] h-auto">
            {colorOptions.map((color, index) => (
              <div
                key={index}
                onClick={() => onColorSelect(color)}
                className="w-[36px] h-[36px] rounded-full cursor-pointer border-2 hover:scale-105 transition-transform duration-150 ease-in-out"
                style={{ backgroundColor: color, borderColor: currentColor === color ? '#ffffff' : 'transparent' }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
