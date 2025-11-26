import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  Squares2X2Icon,
  HeartIcon,
  BellIcon,
  Cog6ToothIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { Search, ChevronDown } from "lucide-react";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    // Navigate to home with search query as state
    navigate("/", { state: { searchQuery: searchQuery } });
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen flex">
      {/* Hamburger Button - Mobile Only */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg md:hidden"
      >
        {sidebarOpen ? (
          <XMarkIcon className="w-6 h-6 text-gray-700" />
        ) : (
          <Bars3Icon className="w-6 h-6 text-gray-700" />
        )}
      </button>

      {/* Overlay - Mobile Only */}
      {sidebarOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static
          w-64 md:w-24
          bg-white border-r border-gray-100
          flex flex-col py-6
          transition-transform duration-300 ease-in-out
          z-40
          h-screen
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Logo */}
        <h1 className="text-xl font-bold text-center mb-10 md:block">
          W
        </h1>

        {/* Menu */}
        <div className="flex-1 flex flex-col gap-8 items-center">
          {/* Home */}
          <NavLink
            to="/"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 transition w-full justify-center
              ${isActive ? "text-blue-600" : "text-gray-700 hover:text-gray-600"}`
            }
          >
            <HomeIcon className="w-7 h-7" />
            <span className="text-xs">Home</span>
          </NavLink>

          {/* Categories */}
          <NavLink
            to="/categories"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 transition w-full justify-center
              ${isActive ? "text-blue-600" : "text-gray-700 hover:text-gray-600"}`
            }
          >
            <Squares2X2Icon className="w-7 h-7" />
            <span className="text-xs">Categories</span>
          </NavLink>

          {/* Favourites */}
          <NavLink
            to="/favourites"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 transition w-full justify-center
              ${isActive ? "text-blue-600" : "text-gray-700 hover:text-gray-600"}`
            }
          >
            <HeartIcon className="w-7 h-7" />
            <span className="text-xs">Favourites</span>
          </NavLink>

          {/* Notification */}
          <NavLink
            to="/notification"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 transition w-full justify-center
              ${isActive ? "text-blue-600" : "text-gray-700 hover:text-gray-600"}`
            }
          >
            <BellIcon className="w-7 h-7" />
            <span className="text-xs">Notification</span>
          </NavLink>

          {/* Settings */}
          <NavLink
            to="/settings"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 transition w-full justify-center
              ${isActive ? "text-blue-600" : "text-gray-700 hover:text-gray-600"}`
            }
          >
            <Cog6ToothIcon className="w-7 h-7" />
            <span className="text-xs">Settings</span>
          </NavLink>
        </div>
      </aside>

      {/* Page content */}
      <main className="flex-1 flex flex-col">
        {/* Search Bar */}
        <div className="sticky top-0 bg-white z-20 border-b border-gray-100 px-4 py-3 md:px-8">
          <div className="flex items-center gap-4">
            <form
              onSubmit={handleSearch}
              className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2"
            >
              <Search className="text-gray-500 w-5 h-5" />

              <input
                type="text"
                placeholder="Search wallpapers"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none px-3 text-sm"
              />
            </form>

            {/* Avatar with Dropdown */}
            <button className="flex items-center gap-2 hover:opacity-80 transition">
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Head */}
                  <circle cx="50" cy="35" r="18" fill="white" />
                  {/* Body */}
                  <path
                    d="M 20 80 Q 20 55, 50 55 Q 80 55, 80 80 L 80 100 L 20 100 Z"
                    fill="white"
                  />
                </svg>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-4 md:p-8 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}