import { Outlet } from "react-router-dom";
import Menu from "./menu";
import AuthProvider from "../auth/AuthProvider";

function Dashboard() {
  return (
    <AuthProvider>
      <div className="w-full h-full flex">
        <div className="border-r-2 min-w-[150px]">
          <Menu />
        </div>
        <main className="h-full flex-1">
          <Outlet />
        </main>
      </div>
    </AuthProvider>
  );
}

export default Dashboard;
