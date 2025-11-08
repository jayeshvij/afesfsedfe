import React, { useState, useEffect } from 'react';
import { Order } from '../types';
import { driverAPI } from '../services/api';

const DriverDashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await driverAPI.getAssignedOrders();
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleMarkAsDelivered = async (orderId: number) => {
    try {
      await driverAPI.markAsDelivered(orderId);
      setOrders(orders.filter(order => order.id !== orderId));
      alert('Order marked as delivered!');
    } catch (error) {
      console.error('Failed to mark as delivered:', error);
      alert('Failed to mark order as delivered');
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
      <h1 className="text-3xl font-bold mb-8">Driver Dashboard</h1>
      
      <div className="mb-6">
        <div className="bg-green-50 border border-green-200 rounded-md p-4">
          <h3 className="text-sm font-medium text-green-800">Instructions:</h3>
          <ul className="mt-2 text-sm text-green-700 list-disc list-inside">
            <li>View assigned orders</li>
            <li>Mark orders as "Delivered" when completed</li>
            <li>Contact customer if needed using provided information</li>
          </ul>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No assigned orders</p>
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
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                  {order.status.replace('_', ' ')}
                </span>
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Delivery Address:</h4>
                <p className="text-gray-600 bg-gray-50 p-3 rounded">
                  {order.address}
                </p>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  <p>Order placed: {new Date(order.createdAt).toLocaleString()}</p>
                </div>
                <button
                  onClick={() => handleMarkAsDelivered(order.id)}
                  className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
                >
                  Mark as Delivered
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DriverDashboard;
