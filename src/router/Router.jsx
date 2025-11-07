import React from "react";
import { createBrowserRouter } from "react-router";
import Layout from "../layout/Layout";
import Dashboard from "../pages/Dashboard";
import AddBook from "../pages/AddBook";
import Login from "../pages/Login";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/add-book",
        element: <AddBook />,
      },
      // {
      //   path: "/dashboard",
      //   index: true,
      //   element: <Dashboard />,
      // },
      // {
      //   path: "/dashboard",
      //   index: true,
      //   element: <Dashboard />,
      // },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default Router;
