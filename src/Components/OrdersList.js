import React, { useEffect, useState } from "react";
import axios from "axios";
import "./OrderList.css"; // Import CSS
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("ALL");
  const navigate = useNavigate();

  // Fetch orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      const farmerEmail = localStorage.getItem("email"); // Get farmer's email
      if (!farmerEmail) {
        setError("Farmer email is missing in localStorage");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8080/api/orders/farmer/${farmerEmail}`
        );
        setOrders(response.data);
        setFilteredOrders(response.data); // Show all orders by default
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to fetch orders");
      }
    };

    fetchOrders();
  }, []);

  // Update order status
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:8080/api/orders/${orderId}/status/${newStatus}`
      );
      setStatus("Status updated successfully");

      // Refresh orders after status update
      const farmerEmail = localStorage.getItem("email");
      const response = await axios.get(
        `http://localhost:8080/api/orders/farmer/${farmerEmail}`
      );
      setOrders(response.data);
      applyFilter(selectedFilter, response.data);
    } catch (error) {
      console.error("Error updating order status:", error);
      setStatus("Failed to update status");
    }
  };

  // Apply payment type filter
  const applyFilter = (filterType, orderList = orders) => {
    if (filterType === "ALL") {
      setFilteredOrders(orderList);
    } else {
      setFilteredOrders(
        orderList.filter((order) => order.paymentType === filterType)
      );
    }
    setSelectedFilter(filterType);
  };

  return (
    <div className="orders-container">
      {/* Sidebar Navigation */}
      <nav className="sidebar">
        <h2 className="sidebar-title">Harvest Hub</h2>
        <ul>
          <li>
            <a href="/farmer-dashboard">Home</a>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/spices">Add Spices</Link>
          </li>
          <li>
            <a href="/knowledgehub">Knowledge Hub</a>
          </li>
          <li onClick={() => navigate("/orderslist")}>Orders</li>
        </ul>
        <div className="logout">
          <Link to="/logout">Logout</Link>
        </div>
      </nav>

      {/* Orders Header */}
      <h3>Orders</h3>

      {/* Error and Status Messages */}
      {error && <p className="error-message">{error}</p>}
      {status && <p className="status-message">{status}</p>}

      {/* Menu Bar for Filtering */}
      <div className="menu-bar">
        <button
          className={`menu-button ${selectedFilter === "ALL" ? "active" : ""}`}
          onClick={() => applyFilter("ALL")}
        >
          All Orders
        </button>
        <button
          className={`menu-button ${
            selectedFilter === "DIRECT" ? "active" : ""
          }`}
          onClick={() => applyFilter("DIRECT")}
        >
          Direct Payments
        </button>
        <button
          className={`menu-button ${
            selectedFilter === "ONLINE" ? "active" : ""
          }`}
          onClick={() => applyFilter("ONLINE")}
        >
          Online Payments
        </button>
      </div>

      {/* Orders Table */}
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Spice Name</th>
            <th>Quantity</th>
            <th>Spice Image</th>
            <th>Payment Type</th>
            <th>Transaction ID</th>
            <th>Order Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.spice?.name || "N/A"}</td>
                <td>{order.quantity || "N/A"}</td>
                <td>
                  {order.spice?.spicePhoto ? (
                    <img
                      src={order.spice.spicePhoto}
                      alt={order.spice.name}
                      width="50"
                      height="50"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td>{order.paymentType}</td>

                {/* Display Transaction ID only for Online Payments */}
                <td>
                  {order.paymentType === "ONLINE" && order.transactionId ? (
                    <span>{order.transactionId}</span>
                  ) : (
                    <span>-</span>
                  )}
                </td>

                {/* Dropdown to Update Order Status */}
                <td>
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    className="status-dropdown"
                  >
                    <option value="ORDER_PLACED">Order Placed</option>
                    <option value="ORDER_CONFIRMED">Order Confirmed</option>
                    <option value="ORDER_PROCESSED">Order Processed</option>
                    <option value="SHIPPED">Ready to Ship</option>
                    <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
                    <option value="DELIVERED">Delivered</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No orders found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersList;
