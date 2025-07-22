import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="min-h-screen w-full flex">
      {/* LEFT SIDE - Hidden on mobile */}
      <div className="hidden md:flex md:w-2/3 bg-gradient-to-br from-blue-600 to-purple-700 items-center justify-center p-8">
        <div className="text-white text-center max-w-md">
          <h1 className="text-4xl font-bold mb-4">Welcome to Lawyer Dashboard</h1>
          <p className="text-lg opacity-90">Manage your legal practice with ease and efficiency.</p>
        </div>
      </div>

      {/* RIGHT SIDE - Full on mobile, 1/3 on desktop */}
      <div className="w-full md:w-1/3 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Logo Section */}
          <div className="flex items-center gap-2 mb-8">
            <span className="text-xl font-bold text-gray-900">LegalAssist</span>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
