import React, { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, X } from "lucide-react";

const translateToEnglish = (text: string) => {
  try {
    return new Intl.DisplayNames(["en"], { type: "language" }).of(text) || text;
  } catch {
    return text; // If translation fails, return the original text
  }
};

interface SearchableDropdownProps {
  options: string[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder: string;
  label: string;
}

export const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  options,
  selectedValues,
  onChange,
  placeholder,
  label,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter((option) =>
    // option.toLowerCase().includes(searchTerm.toLowerCase())
  {
    const translatedOption = translateToEnglish(option);
    // console.log(translatedOption, "translatedOption");
    return translatedOption.toLowerCase().includes(searchTerm.toLowerCase());
  }
  );

  const toggleOption = (option: string) => {
    const newValues = selectedValues.includes(option)
      ? selectedValues.filter((v) => v !== option)
      : [...selectedValues, option];
    onChange(newValues);
  };

  const removeValue = (valueToRemove: string) => {
    onChange(selectedValues.filter((value) => value !== valueToRemove));
  };

  return (
    <div className="space-y-2" ref={dropdownRef}>
      {/* <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label> */}
      <div className="relative">
        {/* Selected values display */}
        <div
          className="min-h-[2.5rem] w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 cursor-pointer flex flex-wrap gap-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedValues.length > 0 ? (
            selectedValues.map((value) => (
              <span
                key={value}
                className="inline-flex items-center px-2 py-1 rounded-md bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-sm"
              >
                {value}
                <X
                  className="h-4 w-4 ml-1 cursor-pointer hover:text-indigo-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeValue(value);
                  }}
                />
              </span>
            ))
          ) : (
            <span className="text-gray-500 dark:text-gray-400">
              {placeholder}
            </span>
          )}
          <ChevronDown className="h-5 w-5 text-gray-400 dark:text-gray-300 absolute right-3 top-3" />
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-300 dark:border-gray-700">
            {/* Search input */}
            <div className="p-2 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <input
                  type="text"
                  className="w-full pl-8 pr-4 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder={`Search ${label.toLowerCase()}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
                <Search className="absolute left-2 top-2 h-4 w-4 text-gray-400 dark:text-gray-300" />
              </div>
            </div>

            {/* Options list */}
            <div className="max-h-60 overflow-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <div
                    key={option}
                    className={`px-4 py-2 cursor-pointer ${
                      selectedValues.includes(option)
                        ? "bg-indigo-50 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-100"
                        : "text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                    onClick={() => toggleOption(option)}
                  >
                    {option}
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500 dark:text-gray-400">
                  No results found
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
