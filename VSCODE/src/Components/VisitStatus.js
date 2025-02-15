import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import "./VisitStatus.css"; // Assume you have your CSS styles here

const VisitStatus = () => {
  const location = useLocation();
  const email = location.state?.email || localStorage.getItem('email');
  const farmerEmail = location.state?.farmerEmail || localStorage.getItem('farmerEmail');

  const [visitRequests, setVisitRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVisitRequests = async () => {
      try {
        setLoading(true);
        let response;
  
        if (farmerEmail) {
          // Fetch visit requests for the farmer
          response = await axios.get(`http://localhost:8080/api/visitrequests/farmer/${farmerEmail}`);
        } else {
          // Fetch visit requests for the consumer
          response = await axios.get(`http://localhost:8080/api/visitrequests/consumer/${email}`);
        }
  
        console.log("Response Data:", response.data);  // Log the data here
  
        if (response.data && response.data.length > 0) {
          setVisitRequests(response.data);
        } else {
          setVisitRequests([]);
        }
      } catch (error) {
        setError("Error fetching visit requests. Please try again later.");
        console.error('Error fetching visit requests:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchVisitRequests();
  }, [email, farmerEmail]);

  if (loading) {
    return <div>Loading visit requests...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="visit-status-container">
      {/* Sidebar */}
      <nav className="sidebar">
        <h2 className="sidebar-title">Harvest Hub</h2>
        <ul>
          <li><Link to="/consumer-dashboard">Home</Link></li>
          <li><Link to="/consumerorders">Your Orders</Link></li>
          <li><Link to="/cart">My Cart</Link></li>
        </ul>
        <Link to="/logout">Logout</Link>
      </nav>

      <h2>Your Visit Requests</h2>
      <table className="status-table">
        <thead>
          <tr>
            <th>Meeting Date</th>
            <th>Status</th>
            <th>Spice Name</th> {/* Changed column name to Spice Name */}
          </tr>
        </thead>
        <tbody>
          {visitRequests.length > 0 ? (
            visitRequests.map((request) => (
              <tr key={request.id}>
                <td>{request.visitDate || 'N/A'}</td>
                <td className={request.status.toLowerCase()}>{request.status}</td>
                <td>
                  {request.spiceNames && request.spiceNames.length > 0 ? (
                    request.spiceNames.map((name, index) => (
                      <span key={index}>
                        {name || 'Unknown Spice'} {/* Fallback if name is undefined */}
                        {index < request.spiceNames.length - 1 ? ', ' : ''}
                      </span>
                    ))
                  ) : (
                    'N/A'
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No visit requests found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VisitStatus;
