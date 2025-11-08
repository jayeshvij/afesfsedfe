import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (!user) return null;
    
    switch (user.role) {
      case 'ADMIN':
        return <Link to="/admin" className="text-blue-600 hover:text-blue-800">Admin Dashboard</Link>;
      case 'STORE_OWNER':
        return <Link to="/store" className="text-blue-600 hover:text-blue-800">Store Dashboard</Link>;
      case 'DRIVER':
        return <Link to="/driver" className="text-blue-600 hover:text-blue-800">Driver Dashboard</Link>;
      default:
        return <Link to="/orders" className="text-blue-600 hover:text-blue-800">My Orders</Link>;
    }
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              QuickCommerce
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            {user ? (
              <>
                {getDashboardLink()}
                <Link to="/cart" className="relative text-gray-700 hover:text-blue-600">
                  Cart ({getTotalItems()})
                </Link>
                <span className="text-gray-600">Welcome, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-blue-600">
                  Login
                </Link>
                <Link to="/register" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
