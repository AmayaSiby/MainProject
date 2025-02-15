import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./SpiceDetails.css";

const SpiceDetails = () => {
  const { id } = useParams();
  const [spice, setSpice] = useState(null);
  const [farmerProfile, setFarmerProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const history = useNavigate();

  useEffect(() => {
    const fetchSpiceDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/spices/${id}`);
        setSpice(response.data);
      } catch (error) {
        console.error("Error fetching spice details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpiceDetails();
  }, [id]);

  const fetchFarmerProfile = async (email) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/profiles/user/email/${email}`);
      setFarmerProfile(response.data);
      setShowProfile(true);
    } catch (error) {
      console.error("Error fetching farmer profile", error);
    }
  };

  const closeProfile = () => setShowProfile(false);

  const addToCart = async () => {
    const consumerEmail = localStorage.getItem("email");
    if (!consumerEmail) {
      alert("User not logged in! Please log in first.");
      return;
    }

    try {
      const cartItem = {
        consumerEmail: consumerEmail,
        spice: { id: spice.id },
        quantity: 1,
      };
      await axios.post("http://localhost:8080/api/cart/add", cartItem);
      alert("Item added to cart!");
    } catch {
      history("/cart");
    }
  };

  const buyNow = () => {
    const consumerEmail = localStorage.getItem("email");
    if (!consumerEmail) {
      alert("User not logged in! Please log in first.");
      return;
    }
    history("/checkout");
  };

  if (loading) return <div>Loading spice details...</div>;

  return (
    <div className="spice-details">
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

      {/* Spice Details */}
      <h1>{spice.name}</h1>
      <img src={spice.spicePhoto || "default-image.jpg"} alt={spice.name} className="spice-image" />
      <p>{spice.description}</p>
      <p><strong>Price:</strong> {spice.minPriceLevel}</p>
      <p><strong>Availability:</strong> {spice.availability}</p>

      {/* Add to Cart and Buy Now Buttons */}
      {spice.availability === "Available" && (
        <div className="button-group">
          <button className="cart-button" onClick={addToCart}>Add to Cart</button>
          <button className="buy-button" onClick={buyNow}>Buy Now</button>
        </div>
      )}

      {/* Farmer Profile */}
      <p>
        <span className="clickable-text" onClick={() => fetchFarmerProfile(spice.farmerEmail)}>
          Click to see profile of Farmer
        </span>
      </p>

      {showProfile && farmerProfile && (
        <div className="modal-overlay" onClick={closeProfile}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Farmer Profile</h2>
            <img src={farmerProfile.farmerImage} alt="Farmer" className="profile-image" />
            <p><strong>Name:</strong> {farmerProfile.user.name}</p>
            <p><strong>Email:</strong> {farmerProfile.user.email}</p>
            <p><strong>Phone:</strong> {farmerProfile.phoneNumber}</p>
            <p><strong>Address:</strong> {farmerProfile.address}</p>
            <p><strong>State:</strong> {farmerProfile.state}</p>
            <button className="close-button" onClick={closeProfile}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpiceDetails;