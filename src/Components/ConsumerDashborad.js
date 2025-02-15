import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa"; // Import search icon
import "./ConsumerDashboard.css";

const ConsumerDashboard = () => {
  const [spices, setSpices] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const consumerEmail = localStorage.getItem("email");

  useEffect(() => {
    const fetchSpices = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/spices/getspice");
        setSpices(response.data);
      } catch (error) {
        console.error("Error fetching spices:", error);
      }
    };
    fetchSpices();
  }, []);

  const addToCart = async (spice) => {
    if (!consumerEmail) {
      alert("User not logged in! Please log in first.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/api/cart/consumer/${consumerEmail}`);
      const cartItems = response.data || [];

      const existingItem = cartItems.find(item => item.spice.id === spice.id);
      if (existingItem) {
        alert("Item is already in the cart!");
        return;
      }

      const cartItem = {
        consumerEmail: consumerEmail,
        spice: { id: spice.id },
        quantity: 1,
        farmerEmail: spice.farmerEmail
      };

      await axios.post("http://localhost:8080/api/cart/add", cartItem);
      alert("Item added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error.response?.data || error.message);
      alert("Error adding item to cart! Please try again later.");
    }
  };

  // Filter spices based on search query
  const filteredSpices = spices.filter(spice =>
    spice.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <nav className="sidebar">
        <h2 className="sidebar-title">Harvest Hub</h2>
        <ul>
          <li><Link to="/consumerorders">Your Orders</Link></li>
          <li><Link to="/cart">My Cart</Link></li>
        </ul>
        <Link to="/logout">Logout</Link>
      </nav>

      <div className="main-content">
        <h1>Available Spices</h1>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search spices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="search-icon" />
        </div>

        <div className="spices-list">
          {filteredSpices.length === 0 ? (
            <p>No items found.</p>
          ) : (
            filteredSpices.map((spice) => (
              <div className="spice-card" key={spice.id}>
                <Link to={`/spicesdetails/${spice.id}`} className="spice-card-link">
                  <div className="spice-image">
                    <img src={spice.spicePhoto || "default-image.jpg"} alt={spice.name} />
                  </div>
                  <div className="spice-info">
                    <h3>{spice.name}</h3>
                    {spice.availability !== "Available" ? (
                      <p style={{ color: "red" }}>The item is not available</p>
                    ) : (
                      <>
                        <p>Quantity: {spice.quantity}</p>
                        <p>Price Level: {spice.minPriceLevel}</p>
                      </>
                    )}
                    {spice.availability === "Available" && (
                      <button onClick={() => addToCart(spice)}>Add to Cart</button>
                    )}
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsumerDashboard;
