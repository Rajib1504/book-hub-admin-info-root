import React from "react";
import { NavLink } from "react-router"; 
import { 
  HiHome, 
  HiBookOpen, 
  HiCollection, 
  HiUsers, 
  HiUserCircle 
} from "react-icons/hi";

const Sidebar = () => {
  // স্টাইল ক্লাস
  const baseClass = "flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300 font-medium text-base";
  const activeClass = `${baseClass} bg-indigo-600 text-white shadow-lg shadow-indigo-200`;
  const inactiveClass = `${baseClass} text-gray-600 hover:bg-indigo-50 hover:text-indigo-600`;

  const navItems = [
    { path: "/", label: "Dashboard", icon: <HiHome className="text-xl" /> },
    { path: "/add-book", label: "Add Book", icon: <HiBookOpen className="text-xl" /> },
    { path: "/book-mannagement", label: "Manage Books", icon: <HiCollection className="text-xl" /> },
    { path: "/users", label: "Users", icon: <HiUsers className="text-xl" /> },
    { path: "/profile", label: "Profile", icon: <HiUserCircle className="text-xl" /> },
  ];

  return (
    <ul className="flex flex-col gap-2">
      <li className="menu-title text-gray-400 font-semibold uppercase tracking-wider mb-2 pl-4 text-xs">
        Main Menu
      </li>
      
      {navItems.map((item) => (
        <li key={item.path}>
          <NavLink
            to={item.path}
            className={({ isActive }) => isActive ? activeClass : inactiveClass}
            end={item.path === "/"}
          >
            {item.icon}
            {item.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default Sidebar;