import React from "react";
import { MdOutlineLogout } from "react-icons/md";
import { NavLink } from "react-router";

const Sidebar = ({ onLinkClick = () => {} }) => {
  const activeClass =
    "block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700";
  const inactiveClass =
    "block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700";

  return (
    <div className="flex h-screen flex-col justify-between border-e border-gray-100 bg-white">
      <div className="px-4 py-6">
        <span className="grid place-content-center rounded-lg text-2xl text-gray-600">
          Admin Pannel
        </span>

        <ul className="mt-6 space-y-1">
          <li>
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive ? activeClass : inactiveClass
              }
              onClick={onLinkClick}
              end
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to={"/add-book"}
              className={({ isActive }) =>
                isActive ? activeClass : inactiveClass
              }
              onClick={onLinkClick}
            >
              Add books
            </NavLink>
          </li>

          <li>
            <NavLink
              to={"/invoices"}
              className={({ isActive }) =>
                isActive ? activeClass : inactiveClass
              }
              onClick={onLinkClick}
            >
              Invoices
            </NavLink>
          </li>

          <li>
            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                <span className="text-sm font-medium"> Account </span>
                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </span>
              </summary>

              <ul className="mt-2 space-y-1 px-4">
                <li>
                  <NavLink
                    to={"/account-details"}
                    className={({ isActive }) =>
                      isActive ? activeClass : inactiveClass
                    }
                    onClick={onLinkClick}
                  >
                    Details
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/security"}
                    className={({ isActive }) =>
                      isActive ? activeClass : inactiveClass
                    }
                    onClick={onLinkClick}
                  >
                    Security
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={onLinkClick}
                    className="w-full rounded-lg px-4 py-2 [text-align:_inherit] text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
        <div className="flex items-center justify-between bg-white p-4 hover:bg-gray-50">
          <div className="flex gap-2">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?auto=format&fit=crop&q=80&w=1160"
              className="size-10 rounded-full object-cover"
            />
            <p className="text-xs flex-col flex">
              <strong className="block font-medium">Eric Frusciante</strong>
              <span> eric@frusciante.com </span>
            </p>
          </div>
          <MdOutlineLogout className="h-6 w-6 text-red-400" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
