import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Import Link for sidebar navigation
import "./Profile.css"; // Import the CSS file

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("id");

  // Initialize the navigate function
  const navigate = useNavigate();

  // Fetch user profile details
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/profiles/user/${userId}`);
        if (response.data) {
          setProfile(response.data); // Update the profile state with the fetched data
        } else {
          navigate("/createprofile"); // Redirect to create profile page if no profile is found
        }
      } catch (err) {
        setError("Error fetching profile"); // Handle error gracefully
        navigate("/createprofile"); // Redirect to create profile page if error occurs
      } finally {
        setLoading(false); // Stop loading once the request is complete
      }
    };

    fetchProfile();
  }, [userId, navigate]); // Include navigate in the dependency array

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Error state
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="profile-dashboard">
      {/* Sidebar */}
      <nav className="sidebar">
        <h2 className="sidebar-title">Harvest Hub</h2>
        <ul>
          <li><Link to="/farmer-dashboard">Home</Link></li>
          <li><Link to="/spices">Add Spices</Link></li>
          <li><Link to="/farmorder">Orders</Link></li>
          <li><Link to="/knowledgehub">Knowledge Hub</Link></li>
        </ul>
        <div className="logout">
          <Link to="/logout">Logout</Link>
        </div>
      </nav>

      {/* Profile Section */}
      <div className="profile-container">
        <h1>User Profile</h1>
        {profile ? (
          <div className="profile-details">
            {/* RENDERING the farmer image if it exists */}
            {profile.farmerImage && (
              <div className="profile-image">
                <img src={profile.farmerImage} alt="Farmer" />
              </div>
            )}

            <p><strong>Name:</strong> {profile.user.name}</p>
            <p><strong>Email:</strong> {profile.user.email}</p>
            <p><strong>Phone:</strong> {profile.phoneNumber}</p>
            <p><strong>Address:</strong> {profile.address}</p>
            <p><strong>State:</strong> {profile.state}</p>
           

            <button onClick={() => navigate("/updateprofile")}>Update Profile</button>
          </div>
        ) : (
          <div>
            <p>No profile details available</p>
            <button onClick={() => navigate("/createprofile")}>Complete Profile</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
