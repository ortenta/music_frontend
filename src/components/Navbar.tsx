import { useEffect } from "react";
import { Bell, User, Music } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { useNavigate } from "react-router-dom";


export default function Navbar() {
  const userData = JSON.parse(localStorage.getItem("musicUserData") || "{}");
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { accessToken, name, email, isAdmin } = userData;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".relative")) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16">
      <div className="h-full px-6 flex items-center justify-between">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/artists")}
        >
          <Music className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Music App
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
          <div className="relative">
            <button
              className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={toggleDropdown}
            >
              <User className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-60 min-w-max bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
                <div className="p-4">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">
                    {name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                    {email}
                  </p>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700">
                  {isAdmin && (
                    <button
                      className="w-full text-left px-4 py-2 text-sm text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => navigate("/userList")}
                    >
                      User List
                    </button>
                  )}
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => {
                      localStorage.removeItem("musicUserData"); // Remove user data
                      setIsDropdownOpen(false); // Close dropdown
                      navigate("/login"); // Redirect to login page
                    }}
                  >
                    {accessToken ? "Logout" : "No Data"}
                    {/* { localStorage.getItem("musicUserData") ? "Logout" : "No Data"} */}
                  </button>
                </div>
              </div>
            )}
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}