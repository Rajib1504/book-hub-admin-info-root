import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="grid grid-cols-12">
      <section className="col-span-2">
        <Sidebar />
      </section>
      <section className="col-span-9">
        <Outlet />
      </section>
    </div>
  );
};

export default Layout;
