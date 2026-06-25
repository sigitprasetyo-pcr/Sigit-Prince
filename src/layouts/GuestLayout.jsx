import { Outlet } from "react-router-dom";

export default function GuestLayout() {
  return (
    <div className="min-h-screen bg-ivory text-charcoal">
      <main>
        <Outlet />
      </main>
    </div>
  );
}