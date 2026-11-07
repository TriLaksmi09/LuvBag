
import { Outlet } from "react-router-dom";
import Navbar from "../komponen/Navbar";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Header/Navbar */}
      <Navbar />

      {/* Main Section */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4">
        <p>© 2026 LuvBag | Your Everyday Bag Collection</p>
      </footer>

    </div>
  );
}
