import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { orderAPI } from '../services/api';
import QRPaymentModal from '../components/QRPaymentModal';

const Checkout: React.FC = () => {
  const { cartItems, getTotalAmount, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setAddress(`Lat: ${latitude.toFixed(6)}, Lng: ${longitude.toFixed(6)}`);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your location');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser');
    }
  };

  const handlePlaceOrder = async () => {
    if (!address.trim()) {
      alert('Please enter your address');
      return;
    }

    setIsLoading(true);
    try {
      const order = await orderAPI.placeOrder({
        address: address.trim(),
        totalAmount: getTotalAmount(),
      });
      
      setOrderId(order.id);
      setShowQRModal(true);
    } catch (error) {
      console.error('Failed to place order:', error);
      alert('Failed to place order');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentComplete = () => {
    setShowQRModal(false);
    clearCart();
    navigate(`/orders/${orderId}`);
  };

  if (cartItems.length === 0) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center py-2 border-b">
              <div>
                <span className="font-medium">{item.product.name}</span>
                <span className="text-gray-600 ml-2">x{item.quantity}</span>
              </div>
              <span className="font-semibold">
                ₹{(item.product.price * item.quantity).toLocaleString()}
              </span>
            </div>
          ))}
          <div className="flex justify-between items-center py-4 border-t-2 border-gray-200">
            <span className="text-xl font-bold">Total:</span>
            <span className="text-xl font-bold text-green-600">
              ₹{getTotalAmount().toLocaleString()}
            </span>
          </div>
        </div>

        {/* Delivery Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                Delivery Address
              </label>
              <textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                rows={4}
                placeholder="Enter your complete delivery address"
                required
              />
            </div>
            
            <button
              onClick={handleLocationClick}
              className="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
            >
              📍 Use Current Location
            </button>
            
            <button
              onClick={handlePlaceOrder}
              disabled={isLoading || !address.trim()}
              className="w-full bg-blue-500 text-white py-3 px-4 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Placing Order...' : 'Place Order & Pay'}
            </button>
          </div>
        </div>
      </div>

      <QRPaymentModal
        isOpen={showQRModal}
        onClose={handlePaymentComplete}
        amount={getTotalAmount()}
      />
    </div>
  );
};

export default Checkout;
