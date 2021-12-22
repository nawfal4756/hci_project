import React from "react";
import { Outlet } from "react-router-dom";

export default function EmployeeOutlet() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
