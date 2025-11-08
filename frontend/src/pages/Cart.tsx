import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, getTotalAmount, isLoading } = useCart();

  const handleRemoveFromCart = async (productId: number) => {
    try {
      await removeFromCart(productId);
    } catch (error) {
      alert('Failed to remove item from cart');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading cart...</div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-6">Add some products to get started!</p>
          <Link
            to="/"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center p-4 border-b">
            <img
              src={item.product.imageUrl}
              alt={item.product.name}
              className="w-20 h-20 object-cover rounded"
            />
            <div className="flex-1 ml-4">
              <h3 className="text-lg font-semibold">{item.product.name}</h3>
              <p className="text-gray-600 text-sm">{item.product.description}</p>
              <div className="flex items-center mt-2">
                <span className="text-lg font-bold text-green-600">
                  ₹{item.product.price.toLocaleString()}
                </span>
                <span className="ml-4 text-gray-600">Qty: {item.quantity}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold">
                ₹{(item.product.price * item.quantity).toLocaleString()}
              </div>
              <button
                onClick={() => handleRemoveFromCart(item.product.id)}
                className="text-red-500 hover:text-red-700 text-sm mt-2"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        
        <div className="p-4 bg-gray-50">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold">Total:</span>
            <span className="text-xl font-bold text-green-600">
              ₹{getTotalAmount().toLocaleString()}
            </span>
          </div>
          <div className="mt-4">
            <Link
              to="/checkout"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 text-center block"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
