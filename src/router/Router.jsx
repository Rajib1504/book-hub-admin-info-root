import React from "react";
import { createBrowserRouter } from "react-router";
import Layout from "../layout/Layout";
import Dashboard from "../pages/Dashboard";
import AddBook from "../pages/AddBook";
import Login from "../pages/Login";
import BookMannagement from "../pages/BookMannagement";
import Profile from "../pages/Profile";
import AdminRoute from "./AdminRoute";
import UserManagement from "../pages/UserMannagement";

const Router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AdminRoute>
        <Layout />
      </AdminRoute>
    ),
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
        path: "/users",
        element: <UserManagement />,
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
