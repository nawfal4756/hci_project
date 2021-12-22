import React from "react";
import { Outlet } from "react-router-dom";

export default function CowOutlet() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
