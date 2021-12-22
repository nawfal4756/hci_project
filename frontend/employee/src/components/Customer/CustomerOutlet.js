import React from "react";
import { Outlet } from "react-router-dom";

export default function CustomerOutlet() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
