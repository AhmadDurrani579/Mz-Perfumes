// src/App.jsx
import { useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Sizes from "./pages/Sizes";
import Categories from "./pages/Categories";
import Brands from "./pages/Brands";
import Branches from "./pages/Branches";
import Banners from "./pages/Banners";
import Promotions from "./pages/Promotions";
import Affiliates from "./pages/Affiliates";
import Orders from "./pages/Orders";
import PartnerBrands from "./pages/PartnerBrands";
import PartnerProducts from "./pages/PartnerProducts";
import { isAuthenticated } from "./api/api";

const TITLES = {
  "/": "Dashboard",
  "/products": "Products",
  "/sizes": "Variants",
  "/categories": "Categories",
  "/brands": "Brands",
  "/branches": "Branches",
  "/banners": "Banners",
  "/promotions": "Promotions",
  "/affiliates": "Affiliates",
  "/orders": "Orders",
  "/partner-brands": "Partner Brands",
  "/partner-products": "Partner Products",
};

function resolveTitle(pathname) {
  return TITLES[pathname] || "MZ Essence";
}

function RequireAuth({ children }) {
  const location = useLocation();
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return children;
}

function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const title = resolveTitle(location.pathname);

  return (
    <div className="app-shell">
      <Sidebar open={sidebarOpen} onNavigate={() => setSidebarOpen(false)} />
      {sidebarOpen && (
        <div
          className="app-shell__overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div className="app-shell__main">
        <Topbar title={title} onMenuClick={() => setSidebarOpen((v) => !v)} />
        <main className="app-shell__content">{children}</main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/*"
        element={
          <RequireAuth>
            <AdminLayout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/products" element={<Products />} />
                <Route path="/sizes" element={<Sizes />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/brands" element={<Brands />} />
                <Route path="/branches" element={<Branches />} />
                <Route path="/banners" element={<Banners />} />
                <Route path="/promotions" element={<Promotions />} />
                <Route path="/affiliates" element={<Affiliates />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/partner-brands" element={<PartnerBrands />} />
                <Route
                  path="/partner-products"
                  element={<PartnerProducts />}
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </AdminLayout>
          </RequireAuth>
        }
      />
    </Routes>
  );
}