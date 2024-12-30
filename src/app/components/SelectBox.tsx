import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

interface SelectBoxProps {
  label?: string;
  icon?: any;
  options: string[];
  isMultiSelect?: boolean; // New prop to toggle between single-select and multi-select
  className?: string;
  arrowStyles?: string;
  values?: string | string[];
  onChange?: (selected: string | string[]) => void;
}

export default function SelectBox({
  label,
  icon,
  options,
  isMultiSelect = false, // Default to single-select
  className,
  arrowStyles,
  values,
  onChange,
}: SelectBoxProps) {
  const [selected, setSelected] = useState<string | string[]>(
    values || (isMultiSelect ? [] : options[0] || "")
  ); // Handle both single and multi-select initial state

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleSingleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelected(value);
    onChange?.(value);
  };

  const handleMultiSelect = (option: string) => {
    const selectedOptions = Array.isArray(selected) ? [...selected] : [];
    const updatedSelection = selectedOptions.includes(option)
      ? selectedOptions.filter((item) => item !== option) // Remove if already selected
      : [...selectedOptions, option]; // Add if not selected

    setSelected(updatedSelection);
    onChange?.(updatedSelection);
  };

  const removeSelectedOption = (option: string) => {
    if (Array.isArray(selected)) {
      const updatedSelection = selected.filter((item) => item !== option);
      setSelected(updatedSelection);
      onChange?.(updatedSelection);
    }
  };

  return (
    <div className="mb-4 w-full">
      {label && (
        <label className="text-sm font-medium text-zinc-400 mb-1 block">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="leading-none text-sm text-[rgba(19,19,19,0.5)] absolute left-3 top-[48%] -translate-y-1/2">
            <FontAwesomeIcon icon={icon} />
          </span>
        )}

        {/* Render single-select or multi-select conditionally */}
        {isMultiSelect ? (
          <div
            className={` appearance-none border border-gray-300 outline-0 w-full px-3 py-2 pr-6 rounded bg-zinc-50
                        text-sm font-medium text-[rgba(19,19,19,0.5)] focus:border-blue-900 cursor-pointer h-[42px] ${className}`}
            onClick={toggleDropdown}
          >
            <div className="flex gap-2 overflow-auto scrollbar-hidden">
              {Array.isArray(selected) && selected.length > 0 ? (
                selected.map((option) => (
                  <div
                    key={option}
                    className="flex items-center bg-gray-200 text-gray-700 text-xs rounded px-2 py-1"
                  >
                    {option}
                    <button
                      className="ml-2 text-gray-500 hover:text-gray-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSelectedOption(option);
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))
              ) : (
                <span className="text-gray-500">Select options</span>
              )}
            </div>
            <div
              className={`absolute inset-y-0 right-3 flex items-center ${arrowStyles}`}
            >
              <FontAwesomeIcon icon={faAngleDown} />
            </div>
          </div>
        ) : (
          <>
            <select
              className={`appearance-none border border-gray-300 outline-0 w-full px-3 py-3 rounded bg-zinc-50
                        text-sm font-medium text-[rgba(19,19,19,0.5)] focus:border-blue-900 h-[42px] ${
                          icon ? "pl-8" : "pl-3"
                        } ${className}`}
              value={selected as string}
              onChange={handleSingleSelect}
            >
              {options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <div
              className={`absolute inset-y-0 right-3 flex items-center ${arrowStyles}`}
            >
              <FontAwesomeIcon icon={faAngleDown} />
            </div>
          </>
        )}

        {dropdownOpen && isMultiSelect && (
          <div className="absolute z-50 mt-2 bg-white border border-gray-300 rounded shadow-lg w-full max-h-40 overflow-auto">
            {options.map((option) => (
              <div
                key={option}
                className={`px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 ${
                  Array.isArray(selected) && selected.includes(option)
                    ? "bg-gray-200"
                    : ""
                }`}
                onClick={() => handleMultiSelect(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
