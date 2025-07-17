import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="auth-layout">
      <h1>Authentication</h1>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
