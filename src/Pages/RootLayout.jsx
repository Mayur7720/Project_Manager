import React from "react";
import { Outlet } from "react-router-dom";
import LeftSideBar from "../Components/LeftSideBar";
function RootLayout() {
  return (
    <section className="w-full h-screen flex">
      <LeftSideBar />
      <Outlet />
    </section>
  );
}

export default RootLayout;
