import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProfileDetails = () => {
  const [profile, setProfile] = useState(null);
  const userId = localStorage.getItem("id") || null;
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      console.error("User ID is missing from localStorage");
      return;
    }

    // Fetch the profile data from the Profile table
    axios
      .get(`http://localhost:8080/api/farmer-profile/${userId}`)
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }, [userId]);

  // Redirect to Profile page if the profile is incomplete
  const handleCompleteProfile = () => {
    navigate("/profile/:id");
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-details-container">
      <h2>Farmer Profile Details</h2>
      {profile ? (
        <>
          <div>
            <strong>Name:</strong> {profile.name}
          </div>
          <div>
            <strong>Email:</strong> {profile.email}
          </div>
          <div>
            <strong>Phone Number:</strong> {profile.phoneNumber}
          </div>
          <div>
            <strong>Address:</strong> {profile.address}
          </div>
          <div>
            <strong>State:</strong> {profile.state}
          </div>
          <div>
            <strong>Mode of Delivery:</strong> {profile.modeOfDelivery}
          </div>
          {profile.farmerImage && (
            <div>
              <strong>Farmer Image:</strong>
              <img src={profile.farmerImage} alt="Farmer" width="100px" />
            </div>
          )}
        </>
      ) : (
        <>
          <p>No profile data available. Please complete your profile.</p>
          <button onClick={handleCompleteProfile}>Complete Profile</button>
        </>
      )}
    </div>
  );
};

export default ProfileDetails;
