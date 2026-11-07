
import { Routes, Route } from "react-router-dom";

// Layout
import MainLayout from "./Layout/MainLayout";
import AdminLayout from "./Layout/AdminLayout";

// Halaman Front Page
import Dashboard from "./pages/frontpages/Dashboard";
import ProductDetail from "./pages/frontpages/ProductDetail";
import Cart from "./pages/frontpages/Cart";
import Checkout from "./pages/frontpages/Checkout";

// Halaman Admin
import AdminDashboard from "./pages/adminpages/AdminDashboard";
import AboutPage from "./pages/adminpages/AboutPage";
import ProductForm from "./pages/adminpages/ProductForm";
import ProductEdit from "./pages/adminpages/ProductEdit";

// Halaman Login
import Login from "./pages/Auth/login";

// Protected Route
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      {/* Halaman Login */}
      <Route path="/login" element={<Login />} />

      {/* Front Page LuvBag */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>

      {/* Admin dengan Protected Route */}
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="about" element={<AboutPage />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="edit-product/:id" element={<ProductEdit />} />
          <Route path="add-product" element={<ProductForm />} />
        </Route>
      </Route>
    </Routes>
  );
}
