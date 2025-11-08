import React, { useState, useEffect } from 'react';
import { Order } from '../types';
import { storeAPI } from '../services/api';

const StoreDashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await storeAPI.getPendingOrders();
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleMarkAsPacked = async (orderId: number) => {
    try {
      await storeAPI.markAsPacked(orderId);
      setOrders(orders.filter(order => order.id !== orderId));
      alert('Order marked as packed!');
    } catch (error) {
      console.error('Failed to mark as packed:', error);
      alert('Failed to mark order as packed');
    }
  };

  const handleAssignDriver = async (orderId: number) => {
    const driverId = prompt('Enter Driver ID (use 4 for demo driver):');
    if (driverId) {
      try {
        await storeAPI.assignDriver(orderId, parseInt(driverId));
        setOrders(orders.filter(order => order.id !== orderId));
        alert('Driver assigned successfully!');
      } catch (error) {
        console.error('Failed to assign driver:', error);
        alert('Failed to assign driver');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading orders...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Store Owner Dashboard</h1>
      
      <div className="mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
          <h3 className="text-sm font-medium text-blue-800">Instructions:</h3>
          <ul className="mt-2 text-sm text-blue-700 list-disc list-inside">
            <li>Mark orders as "Packed" when items are ready</li>
            <li>Assign drivers to packed orders</li>
            <li>Use Driver ID: 4 for demo purposes</li>
          </ul>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No pending orders</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">Order #{order.id}</h3>
                  <p className="text-gray-600">
                    Customer: {order.user.name} ({order.user.email})
                  </p>
                  <p className="text-gray-600">
                    Amount: ₹{order.totalAmount.toLocaleString()}
                  </p>
                  <p className="text-gray-600">
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                  {order.status.replace('_', ' ')}
                </span>
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Delivery Address:</h4>
                <p className="text-gray-600 bg-gray-50 p-3 rounded">
                  {order.address}
                </p>
              </div>
              
              <div className="flex space-x-4">
                <button
                  onClick={() => handleMarkAsPacked(order.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Mark as Packed
                </button>
                <button
                  onClick={() => handleAssignDriver(order.id)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Assign Driver
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StoreDashboard;
