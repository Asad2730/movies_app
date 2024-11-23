import React  from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/auth/login";
import SignUp from "../pages/auth/signup";
import Home from "../pages/movies/home";
import Detail from "../pages/movies/detail";
import PrivateRoute from "./privateRoute";
import { DarkModeProvider, useDarkMode } from "../context/DarkModeContext";

const DarkModeToggle: React.FC = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className={`p-2 rounded-md ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}
    >
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
};

const AppRoutes: React.FC = () => {
 

  return (
    <div className="container mx-auto p-4">
      <DarkModeToggle />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/detail" element={<Detail />} />
        </Route>
      </Routes>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <DarkModeProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </DarkModeProvider>
  );
};

export default App;
