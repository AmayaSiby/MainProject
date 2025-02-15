import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const ConsumerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const consumerEmail = localStorage.getItem('email');
        if (!consumerEmail) {
          console.error("No consumer email found in localStorage.");
          return;
        }

        const response = await axios.get(`http://localhost:8080/api/orders/consumer/${consumerEmail}`);
        console.log('Fetched orders:', response.data);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching consumer orders:', error);
        setError('Failed to fetch orders');
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="consumer-orders-container">
      {/* Sidebar */}
      <nav className="sidebar">
        <h2 className="sidebar-title">Harvest Hub</h2>
        <ul>
          <li><Link to="/consumer-dashboard">Home</Link></li>
          <li><Link to="/cart">My Cart</Link></li>
          <li><Link to="/visit-status">Your Visit Requests</Link></li>
        </ul>
        <Link to="/logout">Logout</Link>
      </nav>

      <h3>Consumer Orders</h3>
      {error && <p>{error}</p>}

      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Spice Name</th>
            <th>Quantity</th>
            <th>Order Type</th> {/* Direct or Online */}
            <th>Spice Image</th>
            <th>Order Status</th>
            <th>Actions</th> {/* View Order Button */}
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.spice?.name || 'N/A'}</td>
                <td>{order.quantity || 'N/A'}</td>
                <td>{order.paymentType === 'DIRECT' ? 'Direct Order' : 'Online Order'}</td>
                <td>
                  {order.spice?.spicePhoto ? (
                    <img 
                      src={order.spice.spicePhoto} 
                      alt={order.spice.name} 
                      width="50" 
                      height="50" 
                    />
                  ) : (
                    'No Image'
                  )}
                </td>
                <td>{order.status || 'N/A'}</td>
                <td>
                  <button 
                    onClick={() => navigate(`/order-details/${order.id}`)}
                    className="view-order-btn"
                  >
                    View Order
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No orders available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ConsumerOrders;
