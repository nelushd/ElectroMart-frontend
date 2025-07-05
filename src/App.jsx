// src/App.jsx
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import Header from "./components/Header";

// User Pages
import ProductListing from "./user/ProductListing";
import ProductDetails from "./user/ProductDetails";
import Cart from "./user/Cart";
import Login from "./user/Login";
import Signup from "./user/Signup";

// Admin Pages
import AdminPanel from "./admin/AdminPanel";
import Dashboard from "./admin/Dashboard";
import ProductPage from "./admin/ProductPage";
import ReviewPage from "./admin/ReviewPage";
import UserPage from "./admin/UserPage";
import InquiryPage from "./admin/InquiryPage";

// Layout for user side (with header)
function UserLayout() {
  return (
    <>
      <Header />
      <div className="p-4 bg-gray-100 min-h-screen">
        <Outlet />
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ User-Facing Routes with Header */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<ProductListing />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* ✅ Admin-Facing Routes (no Header unless you want it) */}
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/products" element={<ProductPage />} />
        <Route path="/admin/reviews" element={<ReviewPage />} />
        <Route path="/admin/users" element={<UserPage />} />
        <Route path="/admin/inquiries" element={<InquiryPage />} />

        {/* 🚫 Redirect unknown paths to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
