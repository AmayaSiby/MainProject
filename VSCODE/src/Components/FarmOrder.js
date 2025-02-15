import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './FarmOrder.css';

const FarmOrder = () => {
  const [visitRequests, setVisitRequests] = useState([]);
  const [orders, setOrders] = useState([]);
  const [currentTab, setCurrentTab] = useState('requests');
  const farmerEmail = localStorage.getItem('email');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVisitRequests = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/visitrequests/farmer/${farmerEmail}`);
        setVisitRequests(response.data);
      } catch (error) {
        console.error('Error fetching visit requests:', error);
      }
    };

    fetchVisitRequests();
  }, [farmerEmail]);

  const handleRequestAction = async (requestId, action) => {
    const status = action.toUpperCase(); // Convert to uppercase to match backend enum

    try {
      const response = await axios.put(
        `http://localhost:8080/api/visitrequests/${requestId}/status?status=${status}`
      );

      if (response.status === 200) {
        setVisitRequests(prevRequests =>
          prevRequests.map(request =>
            request.id === requestId ? { ...request, status } : request
          )
        );
      }
    } catch (error) {
      console.error('Error updating visit request:', error);
      if (error.response) {
        console.error('Backend error:', error.response.data);
      }
    }
  };

  return (
    <div className="farm-order-container">
      <nav className="sidebar">
        <h2 className="sidebar-title">Harvest Hub</h2>
        <ul>
          <li><a href="/farmer-dashboard">Home</a></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/spices">Add Spices</Link></li>
          <li><a href="/knowledgehub">Knowledge Hub</a></li>
          <li onClick={() => setCurrentTab('requests')}>Visit Requests</li>
          <li onClick={() => navigate('/orderslist')}>Orders</li>
        </ul>
        <div className="logout">
          <Link to="/logout">Logout</Link>
        </div>
      </nav>

      <div className="main-content">
        {currentTab === 'requests' ? (
          <div>
            <h3>Visit Requests</h3>
            <table className="requests-table">
              <thead>
                <tr>
                  <th>Consumer Email</th>
                  <th>Meeting Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {visitRequests.map(request => (
                  <tr key={request.id}>
                    <td>{request.consumerEmail}</td>
                    <td>{request.visitDate ? new Date(request.visitDate).toLocaleDateString() : 'N/A'}</td>
                    <td className={request.status.toLowerCase()}>{request.status}</td>
                    <td>
                      {request.status === 'PENDING' && (
                        <>
                          <button onClick={() => handleRequestAction(request.id, 'APPROVED')}>Approve</button>
                          <button onClick={() => handleRequestAction(request.id, 'REJECTED')}>Reject</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>
            <h3>Orders</h3>
            <p>Orders functionality is not yet implemented.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmOrder;
