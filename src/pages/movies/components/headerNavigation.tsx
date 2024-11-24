import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { clearAuthToken } from "../../../store/authSlice";

export const HeaderNavigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const token = useSelector((state: any) => state.auth.token);
  
  const getButtonClass = (path: string) => {
    return location.pathname === path
      ? "text-green-500 dark:text-green-400 hover:text-green-600 dark:hover:text-green-500"
      : "text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400";
  };

  const navigatePage = (path: string) => {
    navigate(path);
    window.location.reload();
  };

  const logout = () => {
    dispatch(clearAuthToken());
    navigate('/login');
    window.location.reload();
  };

  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 shadow-md">
      <div className="flex justify-between items-center p-4 container mx-auto">
        <h1 className="text-2xl font-bold text-blue-600">Movies App</h1>
        <nav className="flex gap-4">
          <button
            onClick={() => navigatePage("/")}
            className={`transition ${getButtonClass("/home")}`}
          >
            Home
          </button>
          
          {token && (
            <button
              onClick={() => navigatePage("/favorites")}
              className={`transition ${getButtonClass("/favorites")}`}
            >
              Favorites
            </button>
          )}
          
          {token ? (
            <button
              onClick={logout}
              className="transition text-gray-700 dark:text-gray-200 hover:text-red-500 dark:hover:text-red-400"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigatePage("/login")}
              className="transition text-blue-500"
            >
              Login
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};
