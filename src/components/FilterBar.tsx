// import React, { useState } from "react";
// import { FilterOptions, FilterOptions1 } from "../types/artist";
// import { Search, Filter, Calendar, ArrowUpDown, X } from "lucide-react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// interface FilterBarProps {
//   filters: FilterOptions;
//   onFilterChange: (filters: FilterOptions) => void;
// }

// export const FilterBar: React.FC<FilterBarProps> = ({
//   filters,
//   onFilterChange,
// }) => {
//   const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

//   const handleDateChange = (dates: [Date | null, Date | null]) => {
//     const [start, end] = dates;

//     const formatDate = (date: Date | null) => {
//       if (!date) return "";
//       const day = String(date.getDate()).padStart(2, "0");
//       const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-based, so add 1
//       const year = date.getFullYear();
//       return `${day}.${month}.${year}`;
//     };
//     // Update the date range only if both start and end are selected
//     onFilterChange({
//       ...filters,
//       dateRange: {
//         start: start ? formatDate(start) : "",
//         end: end ? formatDate(end) : "",
//       },
//     });
//   };

//   const toggleDatePicker = () => {
//     // Toggle visibility on button click regardless of whether both dates are set
//     setIsDatePickerVisible(!isDatePickerVisible);
//   };

//   const handleDateSelect = (dates: [Date | null, Date | null]) => {
//     const [start, end] = dates;
//     handleDateChange(dates);
//     // Close the date picker only after both start and end dates are selected
//     if (start && end) {
//       setIsDatePickerVisible(false);
//     }
//   };

//   return (
//     <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         {/* Search */}
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search artists..."
//             className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//             value={filters.search}
//             onChange={(e) =>
//               onFilterChange({ ...filters, search: e.target.value })
//             }
//           />
//           <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-300" />
//         </div>

//         {/* Date Range Button */}
//         <div className="relative">
//           <button
//             onClick={toggleDatePicker}
//             className="flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-600"
//           >
//             <Calendar className="h-5 w-5 mr-2 text-gray-400 dark:text-gray-300" />
//             {filters.dateRange.start && filters.dateRange.end
//               ? `${filters.dateRange.start} to ${filters.dateRange.end}`
//               : "Select Date Range"}
//           </button>

//           {/* Date Picker Dropdown */}
//           {isDatePickerVisible && (
//             <div className="absolute z-10 mt-2 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-300 dark:border-gray-700">
//               <DatePicker
//                 selected={
//                   filters.dateRange.start
//                     ? new Date(filters.dateRange.start)
//                     : null
//                 }
//                 onChange={handleDateSelect}
//                 startDate={
//                   filters.dateRange.start
//                     ? new Date(filters.dateRange.start)
//                     : null
//                 }
//                 endDate={
//                   filters.dateRange.end ? new Date(filters.dateRange.end) : null
//                 }
//                 selectsRange
//                 inline
//                 dateFormat="yyyy-MM-dd"
//               />
//             </div>
//           )}
//         </div>

//         {/* Rating Range */}
//         {/* <div className="flex items-center space-x-2">
//           <input
//             type="number"
//             placeholder="Min rating"
//             className="w-1/2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//             value={filters.ratingRange.min}
//             onChange={(e) =>
//               onFilterChange({
//                 ...filters,
//                 ratingRange: {
//                   ...filters.ratingRange,
//                   min: Number(e.target.value),
//                 },
//               })
//             }
//           />
//           <input
//             type="number"
//             placeholder="Max rating"
//             className="w-1/2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//             value={filters.ratingRange.max}
//             onChange={(e) =>
//               onFilterChange({
//                 ...filters,
//                 ratingRange: {
//                   ...filters.ratingRange,
//                   max: Number(e.target.value),
//                 },
//               })
//             }
//           />
//         </div> */}

//         <div className="flex items-center space-x-2 -m-4">
//           {/* Rating Range Label */}
//           <label className="text-gray-700 dark:text-gray-300 text-sm">
//             Rating Range
//           </label>

//           {/* Rating Range Inputs */}
//           <input
//             type="number"
//             placeholder="Min rating"
//             className="w-16 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//             value={filters.ratingRange.min}
//             min={-10}
//             max={10}
//             onChange={(e) =>
//               onFilterChange({
//                 ...filters,
//                 ratingRange: {
//                   ...filters.ratingRange,
//                   min: Math.max(-10, Math.min(10, Number(e.target.value))),
//                 },
//               })
//             }
//           />
//           <input
//             type="number"
//             placeholder="Max rating"
//             className="w-16 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//             value={filters.ratingRange.max}
//             min={-10}
//             max={10}
//             onChange={(e) =>
//               onFilterChange({
//                 ...filters,
//                 ratingRange: {
//                   ...filters.ratingRange,
//                   max: Math.max(-10, Math.min(10, Number(e.target.value))),
//                 },
//               })
//             }
//           />
//         </div>

//         {/* Additional Filters Button */}
//         <button className="flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-600">
//           <Filter className="h-5 w-5 mr-2 text-gray-400 dark:text-gray-300" />
//           More Filters
//         </button>
//       </div>
//     </div>
//   );
// };

import React, { useState, useEffect } from "react";
import { FilterOptions1 } from "../types/artist";
import { Search, Filter, Calendar, ArrowUpDown, X } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SearchableDropdown } from "./SearchableDropdown";

const URL = process.env.REACT_APP_BACKEND_URL;

interface FilterBarProps {
  filters: FilterOptions1;
  onFilterChange: (filters: FilterOptions1) => void;
}

interface DropdownItem {
  id: string;
  name: string;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
}) => {
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [countries, setCountries] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState({
    countries: false,
    genres: false,
    labels: false,
  });
  const [error, setError] = useState<{
    countries: string | null;
    genres: string | null;
    labels: string | null;
  }>({
    countries: null,
    genres: null,
    labels: null,
  });

  const fetchDropdownData = async () => {
    // Fetch countries
    try {
      setIsLoading((prev) => ({ ...prev, countries: true }));
      const response = await fetch(`${URL}/common/countries`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      // console.log("country response", response);
      if (!response.ok) throw new Error("Failed to fetch countries");
      const data = await response.json();
      const countryNames = data.map((item: DropdownItem) => item.name);
      setCountries(countryNames);
      // setCountries(data);
    } catch (err) {
      setError((prev) => ({ ...prev, countries: "Failed to load countries" }));
      console.error("Error fetching countries:", err);
    } finally {
      setIsLoading((prev) => ({ ...prev, countries: false }));
    }

    // Fetch genres
    try {
      setIsLoading((prev) => ({ ...prev, genres: true }));
      const response = await fetch(`${URL}/common/genres`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      // console.log("genre response", response);
      if (!response.ok) throw new Error("Failed to fetch genres");
      const data = await response.json();
      const genreNames = data.map((item: DropdownItem) => item.name);
      setGenres(genreNames);
      // setGenres(data);
    } catch (err) {
      setError((prev) => ({ ...prev, genres: "Failed to load genres" }));
      console.error("Error fetching genres:", err);
    } finally {
      setIsLoading((prev) => ({ ...prev, genres: false }));
    }

    // Fetch labels
    try {
      setIsLoading((prev) => ({ ...prev, labels: true }));
      const response = await fetch(`${URL}/common/labels`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      // console.log('label response',response);
      if (!response.ok) throw new Error("Failed to fetch labels");
      const data = await response.json();
      const labelNames = data.map((item: DropdownItem) => item.name);
      setLabels(labelNames);
      // setLabels(data);
    } catch (err) {
      setError((prev) => ({ ...prev, labels: "Failed to load labels" }));
      console.error("Error fetching labels:", err);
    } finally {
      setIsLoading((prev) => ({ ...prev, labels: false }));
    }
  };

  useEffect(() => {
    fetchDropdownData();
  }, []);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    const formatDate = (date: Date | null) => {
      if (!date) return "";
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}.${month}.${year}`;
    };
    onFilterChange({
      ...filters,
      dateRange: {
        start: start ? formatDate(start) : "",
        end: end ? formatDate(end) : "",
      },
    });
  };

  const toggleDatePicker = () => {
    setIsDatePickerVisible(!isDatePickerVisible);
  };

  const handleDateSelect = (dates: [Date | null, Date | null]) => {
    console.log(dates,'handleDateSelect');
    const [start, end] = dates;
    handleDateChange(dates);
    if (start && end) {
      setIsDatePickerVisible(false);
    }
  };

  const handleSortChange = (value: string) => {
    const [sortBy, sortOrder] = value.split("-");
    onFilterChange({
      ...filters,
      sortBy: sortBy as FilterOptions1["sortBy"],
      sortOrder: sortOrder as "asc" | "desc",
    });
  };

  // Sample data - replace with actual data from your backend
  // console.log('countries',countries, 'genres', genres, 'labels', labels);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
      <div className="space-y-4">
        {/* Top row - always visible */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search artists..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={filters.search}
              onChange={(e) =>
                onFilterChange({ ...filters, search: e.target.value })
              }
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-300" />
          </div>

          {/* Sort dropdown */}
          <div className="relative">
            <select
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={`${filters.sortBy}-${filters.sortOrder}`}
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="listeners-desc">Most Popular</option>
              <option value="listeners-asc">Least Popular</option>
              <option value="rating-desc">Highest Rating</option>
              <option value="rating-asc">Lowest Rating</option>
              <option value="listenerGrowth-desc">Highest Growth</option>
              <option value="listenerGrowth-asc">Lowest Growth</option>
              <option value="country-asc">Country (A-Z)</option>
              <option value="country-desc">Country (Z-A)</option>
            </select>
            <ArrowUpDown className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-300" />
          </div>

          {/* Date Range Button */}
          <div className="relative">
            <button
              onClick={toggleDatePicker}
              className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-gray-400 dark:text-gray-300" />
                <span>
                  {filters.dateRange.start && filters.dateRange.end
                    ? `${filters.dateRange.start} to ${filters.dateRange.end}`
                    : "Select Date Range"}
                </span>
              </div>
              {(filters.dateRange.start || filters.dateRange.end) && (
                <X
                  className="h-4 w-4 text-gray-400 hover:text-gray-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    onFilterChange({
                      ...filters,
                      dateRange: { start: "", end: "" },
                    });
                  }}
                />
              )}
            </button>

            {isDatePickerVisible && (
              <div className="absolute z-10 mt-2 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-300 dark:border-gray-700">
                <DatePicker
                  selected={
                    filters.dateRange.start
                      ? new Date(filters.dateRange.start)
                      : null
                  }
                  onChange={handleDateSelect}
                  startDate={
                    filters.dateRange.start
                      ? new Date(filters.dateRange.start)
                      : null
                  }
                  endDate={
                    filters.dateRange.end
                      ? new Date(filters.dateRange.end)
                      : null
                  }
                  selectsRange
                  inline
                  dateFormat="yyyy-MM-dd"
                />
              </div>
            )}
          </div>

          {/* More Filters Toggle */}
          <button
            onClick={() => setShowMoreFilters(!showMoreFilters)}
            className="flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <Filter className="h-5 w-5 mr-2 text-gray-400 dark:text-gray-300" />
            {showMoreFilters ? "Less Filters" : "More Filters"}
          </button>
        </div>

        {/* Extended filters - visible when showMoreFilters is true */}
        {showMoreFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            {/* Countries Searchable Dropdown */}
            <SearchableDropdown
              options={countries}
              selectedValues={filters.countries}
              onChange={(values) =>
                onFilterChange({ ...filters, countries: values })
              }
              placeholder="Select countries"
              label="Countries"
            />

            {/* Genres Searchable Dropdown */}
            <SearchableDropdown
              options={genres}
              selectedValues={filters.genres}
              onChange={(values) =>
                onFilterChange({ ...filters, genres: values })
              }
              placeholder="Select genres"
              label="Genres"
            />

            {/* Labels Searchable Dropdown */}
            <SearchableDropdown
              options={labels}
              selectedValues={filters.labels}
              onChange={(values) =>
                onFilterChange({ ...filters, labels: values })
              }
              placeholder="Select labels"
              label="Labels"
            />

            {/* Rating Range */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Select Rating Range
              </label>
              <div className="flex px-16 space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-24 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  value={filters.ratingRange.min}
                  onChange={(e) =>
                    onFilterChange({
                      ...filters,
                      ratingRange: {
                        ...filters.ratingRange,
                        min: Number(e.target.value),
                      },
                    })
                  }
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="w-24 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  value={filters.ratingRange.max}
                  onChange={(e) =>
                    onFilterChange({
                      ...filters,
                      ratingRange: {
                        ...filters.ratingRange,
                        max: Number(e.target.value),
                      },
                    })
                  }
                />
              </div>
            </div>

            {/* Listener Growth Range */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Listener Growth (%)
              </label>
              <div className="flex px-16 space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-24 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  value={filters.listenerGrowthRange.min}
                  onChange={(e) =>
                    onFilterChange({
                      ...filters,
                      listenerGrowthRange: {
                        ...filters.listenerGrowthRange,
                        min: Number(e.target.value),
                      },
                    })
                  }
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="w-24 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  value={filters.listenerGrowthRange.max}
                  onChange={(e) =>
                    onFilterChange({
                      ...filters,
                      listenerGrowthRange: {
                        ...filters.listenerGrowthRange,
                        max: Number(e.target.value),
                      },
                    })
                  }
                />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="majorLabelsOnly"
                  checked={filters.majorLabelsOnly}
                  onChange={(e) =>
                    onFilterChange({
                      ...filters,
                      majorLabelsOnly: e.target.checked,
                    })
                  }
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor="majorLabelsOnly"
                  className="text-md text-gray-700 dark:text-gray-300"
                >
                  Major Labels Only
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="excludePlaylists"
                  checked={filters.excludePlaylists}
                  onChange={(e) =>
                    onFilterChange({
                      ...filters,
                      excludePlaylists: e.target.checked,
                    })
                  }
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor="excludePlaylists"
                  className="text-md text-gray-700 dark:text-gray-300"
                >
                  Exclude Playlists
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};