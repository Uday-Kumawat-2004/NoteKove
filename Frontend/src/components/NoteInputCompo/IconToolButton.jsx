import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function IconToolButton({
  onClick,
  icon,
  tooltip,
  isActive = false,
  className = "",
  iconClassName = "",
  ...props
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div 
      className="relative group ml-0"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <button
        onMouseDown={(e) => e.preventDefault()}
        onClick={onClick}
        className={`
          flex items-center justify-center cursor-pointer p-1 
          transition duration-300 ease-in-out
          ${className}
        `}
        {...props}
      >
        <FontAwesomeIcon
          icon={icon}
          className={`
            text-sm transition duration-300 ease-in-out
            ${isActive ? "text-gray-400" : "text-gray-200"}
            hover:shadow-lg
            ${iconClassName}
          `}
        />
      </button>
      
      {tooltip && showTooltip && (
        <div className="absolute bg-[#1f3a3b] bottom-full left-1/2 -translate-x-1/2 -translate-y-2 mb-1 px-2 py-1 text-gray-200 text-xs rounded transition-all duration-300 ease-in-out whitespace-nowrap z-50">
          {tooltip}
        </div>
      )}
    </div>
  );
}
