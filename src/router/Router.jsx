import React from "react";
import { createBrowserRouter } from "react-router";
import Layout from "../layout/Layout";
import Dashboard from "../pages/Dashboard";
import AddBook from "../pages/AddBook";
import Login from "../pages/Login";
import BookMannagement from "../pages/BookMannagement";
import Profile from "../pages/Profile";

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
      {
        path: "/book-mannagement",
        element: <BookMannagement />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default Router;
