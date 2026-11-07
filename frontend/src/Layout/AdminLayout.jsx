
import { NavLink, Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex bg-pink-50">

      {/* Sidebar */}
      <aside className="w-60 bg-white shadow-md p-5">
        <h1 className="text-2xl font-bold text-pink-600 mb-8">
          LuvBag
        </h1>

        <nav className="space-y-3">

          {/* Menu Dashboard */}
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `block p-3 rounded-lg ${
                isActive
                  ? "bg-pink-500 text-white"
                  : "text-gray-600 hover:bg-pink-100"
              }`
            }
          >
            Dashboard
          </NavLink>

          {/* Menu Tambah Produk */}
          <NavLink
            to="/admin/add-product"
            className={({ isActive }) =>
              `block p-3 rounded-lg ${
                isActive
                  ? "bg-pink-500 text-white"
                  : "text-gray-600 hover:bg-pink-100"
              }`
            }
          >
            Tambah Produk
          </NavLink>

          {/* Menu About */}
          <NavLink
            to="/admin/about"
            className={({ isActive }) =>
              `block p-3 rounded-lg ${
                isActive
                  ? "bg-pink-500 text-white"
                  : "text-gray-600 hover:bg-pink-100"
              }`
            }
          >
            About
          </NavLink>

        </nav>
      </aside>

      {/* Konten Utama */}
      <main className="flex-1">

        <header className="bg-white shadow-sm p-5">
          <h2 className="text-xl font-semibold text-pink-600">
            LuvBag Admin Panel
          </h2>
        </header>

        <div className="p-6">
          <Outlet />
        </div>

      </main>

    </div>
  );
}
