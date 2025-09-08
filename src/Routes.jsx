import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import Login from "pages/login";
import TimeTracking from "pages/time-tracking";
import Dashboard from "pages/dashboard";
import ProjectManagement from "pages/project-management";
import EmployeeManagement from "pages/employee-management";
import EquipmentInventory from "pages/equipment-inventory";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/time-tracking" element={<TimeTracking />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/project-management" element={<ProjectManagement />} />
        <Route path="/employee-management" element={<EmployeeManagement />} />
        <Route path="/equipment-inventory" element={<EquipmentInventory />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;