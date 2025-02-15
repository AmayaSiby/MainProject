import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // for navigation
import "./FarmerDashboard.css";

const FarmerDashboard = () => {
  const [spices, setSpices] = useState([]);
  const [posts, setPosts] = useState([]); // New state for posts
  const [farmerEmail, setFarmerEmail] = useState(localStorage.getItem("email"));

  // Fetch spices and posts when the dashboard loads
  useEffect(() => {
    const fetchSpices = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/spices/by-email?farmerEmail=${farmerEmail}`);
        setSpices(response.data);
      } catch (error) {
        console.error("Error fetching spices:", error);
      }
    };

    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/knowledge-hub"); // Assuming API endpoint for posts
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchSpices();
    fetchPosts();
  }, [farmerEmail]);

  return (
    <div className="dashboard-container">
      <nav className="sidebar">
        <h2 className="sidebar-title">Harvest Hub</h2>
        <ul>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/spices">Add Spices</Link></li> {/* Link to Add Spice Page */}
         <li><a href="/farmorder">Orders</a></li>
          <li><a href="/knowledgehub">Knowledge Hub</a></li>
        </ul>
        <div className="logout">
        <Link to="/logout">Logout</Link>
        </div>
      </nav>

      <div className="main-content">
        <h1>Welcome to Harvest Hub</h1>

        {/* Display Spices */}
        <div className="spices-list">
  {spices.length === 0 ? (
    <div>
      <p>No Spices Added Yet</p>
      <Link to="/spices">
        <button>Add Spice</button>
      </Link>
    </div>
  ) : (
    spices.map(spice => (
      <div className="spice-card" key={spice.id}>
        {/* Left Side: Image */}
        <div className="spice-image">
          <img src={spice.spicePhoto} alt={spice.name} />
        </div>

        {/* Right Side: Spice Details + Edit Button */}
        <div className="spice-info">
          <h3>{spice.name}</h3>
          {spice.availability === "Not Available" ? (
            <p className="not-available">Item Not Available</p>
          ) : (
            <>
              <p>Quantity: {spice.quantity}</p>
              <p>Price Level: {spice.minPriceLevel}</p>
            </>
          )}
          <Link to={`/edit-spice/${spice.id}`}>
            <button className="edit-button">Edit</button>
          </Link>
        </div>
      </div>
    ))
  )}
</div>



        {/* Display Posts List with truncated content */}
        <div className="posts-list">
          <h2>Knowledge Hub Posts</h2>
          {posts.length === 0 ? (
            <p>No posts yet. Be the first to share!</p>
          ) : (
            posts.map((post) => (
              <div className="post-card" key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.content.slice(0, 150)}...</p> {/* Show first 150 characters */}
                <Link to={`/post/${post.id}`}>
                  <button>Read More</button> {/* Navigate to full post page */}
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
