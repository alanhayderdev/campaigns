import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons";

export default function FilterSelectBox({label, defaultValue, options, onChange}) {
    const [selected, setSelected] = useState(defaultValue || options[0]);
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (option: string) => {
        setSelected(option);
        onChange?.(option);
        setIsOpen(false);
    };

    return (
        <div className="relative min-w-[170px]">
            <div
                className="flex justify-between items-center border border-gray-300
                rounded bg-zinc-50 p-4 min-w-40 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
            <span className="text-sm text-gray-500">
              {label}: <span className="font-medium text-blue-950">{selected}</span>
            </span>
                <FontAwesomeIcon icon={faAngleDown} className="text-gray-600"/>
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
                <div
                    className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {options.map((option) => (
                        <div
                            key={option}
                            className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                                selected === option ? "bg-gray-200 font-medium" : "text-gray-700"
                            }`}
                            onClick={() => handleSelect(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
