import { Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <h1>Dashboard</h1>
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
