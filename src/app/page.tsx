// pages/dashboard.tsx

import Sidebar from "@/components/SideNavbar";

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        {/* Your main dashboard content goes here */}
        <h1 className="text-3xl font-bold">Dashboard Content</h1>
      </div>
    </div>
  );
}
