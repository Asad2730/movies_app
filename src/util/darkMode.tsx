import { useDarkMode } from "../context/DarkModeContext";
import { FaSun, FaMoon } from "react-icons/fa";

export const DarkModeToggle: React.FC = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className={`p-2 rounded-md flex items-center gap-2 ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      {darkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-blue-500" />}
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
};
