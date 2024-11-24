import React  from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/auth/login";
import SignUp from "../pages/auth/signup";
import Home from "../pages/movies/home";
import Detail from "../pages/movies/detail";
import PrivateRoute from "./privateRoute";
import { DarkModeProvider,  } from "../context/DarkModeContext";
import { DarkModeToggle } from "../util/darkMode";


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
