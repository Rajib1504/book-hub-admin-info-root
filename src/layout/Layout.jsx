import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router";
import { HiMenuAlt2 } from "react-icons/hi";
import { useAuth } from "../context/AuthProvider";
import { MdLogout } from "react-icons/md";

const Layout = () => {
  const { user, logout } = useAuth();

  // ইউজারের নামের প্রথম অক্ষর
  const userInitial = user?.name?.charAt(0).toUpperCase() || "A";

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* --- Main Content Area --- */}
      <div className="drawer-content flex flex-col bg-gray-50 min-h-screen">
        {/* --- Top Navbar --- */}
        <div className="w-full navbar bg-white shadow-sm sticky top-0 z-30 h-20 px-6">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-square btn-ghost text-2xl"
            >
              <HiMenuAlt2 />
            </label>
          </div>
          <div className="flex-1 px-2 mx-2">
            <h1 className="text-xl font-bold text-gray-700 lg:block hidden">
              Admin Dashboard
            </h1>
            <h1 className="text-xl font-bold text-gray-700 lg:hidden">
              Admin Panel
            </h1>
          </div>

          {/* User Profile Section in Navbar */}
          <div className="flex-none gap-4">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar placeholder"
              >
                <div className="bg-indigo-600 text-white rounded-full flex justify-center items-center w-12">
                  <span className="text-xl font-bold">{userInitial}</span>
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-1 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li className="menu-title px-4 py-2">
                  <span>{user?.name}</span>
                  <span className="text-xs font-normal block text-gray-500">
                    {user?.email}
                  </span>
                </li>
                <div className="divider my-0"></div>
                <li>
                  <a href="/profile" className="py-3">
                    Profile
                  </a>
                </li>
                <li>
                  <a onClick={logout} className="py-3 text-red-500">
                    <MdLogout /> Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* --- Page Content --- */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* --- Sidebar (Drawer Side) --- */}
      <div className="drawer-side z-40">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <aside className="bg-white text-base-content min-h-full w-80 p-0 border-r border-gray-200">
          {/* Sidebar Logo Area */}
          <div className="h-20 flex items-center px-8 border-b border-gray-100 bg-white sticky top-0 z-20">
            <span className="text-2xl font-extrabold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              BOOK HUB
            </span>
          </div>

          {/* Navigation Links */}
          <div className="p-4">
            <Sidebar />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Layout;
