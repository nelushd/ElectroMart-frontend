import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { RiDashboard2Line } from "react-icons/ri";
import { MdOutlineProductionQuantityLimits, MdOutlineReviews } from "react-icons/md";
import { HiQuestionMarkCircle } from "react-icons/hi";
import { FaUserAlt } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";


import Dashboard from './Dashboard';
import ProductPage from './ProductPage';
import ReviewPage from './ReviewPage';
import InquiryPage from './InquiryPage';
import UserPage from './UserPage';

const menuItems = [
  { name: 'Dashboard', icon: <RiDashboard2Line />, key: 'dashboard' },
  { name: 'Products', icon: <MdOutlineProductionQuantityLimits />, key: 'products' },
  { name: 'Reviews', icon: <MdOutlineReviews />, key: 'reviews' },
  { name: 'Inquiries', icon: <HiQuestionMarkCircle />, key: 'inquiries' },
  { name: 'Users', icon: <FaUserAlt />, key: 'users' },
];

function AdminPanel() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('dashboard'); // ✅ moved here

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const decoded = jwtDecode(token);
      if (decoded.role !== 'admin') {
        navigate('/'); // Not admin → redirect to home
      }
    } catch (err) {
      console.error('Invalid token');
      navigate('/login');
    }
  }, [navigate]); 

  const renderPage = () => {
    switch (activePage) {
      case 'products':
        return <ProductPage />;
      case 'reviews':
        return <ReviewPage />;
      case 'inquiries':
        return <InquiryPage />;
      case 'users':
        return <UserPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white p-6 flex-shrink-0">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-3">
  {menuItems.map((item) => (
    <button
      key={item.key}
      onClick={() => setActivePage(item.key)}
      className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-800 transition ${
        activePage === item.key ? 'bg-blue-800' : ''
      }`}
    >
      {item.icon}
      <span>{item.name}</span>
    </button>
  ))}

  {/* Logout Button */}
  <button
  onClick={() => {
    localStorage.removeItem('token');
    navigate('/');
  }}
  className="w-full mt-10 flex items-center gap-3 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition"
>
  <LuLogOut className="text-white text-lg" />
  <span className="text-white font-semibold">Logout</span>
</button>
</nav>

      </aside>

      {/* Content */}
      <main className="flex-1 p-8 bg-gray-100 overflow-y-auto h-full">
        {renderPage()}
      </main>
    </div>
  );
}

export default AdminPanel;
