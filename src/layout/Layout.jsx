import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router";
import { HiMenu, HiX } from "react-icons/hi";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative grid grid-cols-12 min-h-screen">
      <section className="hidden bg-gray-100 md:block md:col-span-2">
        <Sidebar />
      </section>

      <section className="col-span-12 md:col-span-10">
        <header className="flex items-center justify-between p-4 bg-white shadow-md md:hidden">
          <h1 className="text-lg font-bold">Admin Pannel</h1>
          <button onClick={toggleSidebar} className="text-2xl">
            {isSidebarOpen ? <HiX /> : <HiMenu />}
          </button>
        </header>

        <main className="p-4">
          <Outlet />
        </main>
      </section>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <section
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-gray-100 shadow-xl transform transition-transform duration-300 ease-in-out md:hidden ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 text-2xl text-gray-700 md:hidden"
        >
          <HiX />
        </button>

        <Sidebar onLinkClick={toggleSidebar} />
      </section>
    </div>
  );
};

export default Layout;