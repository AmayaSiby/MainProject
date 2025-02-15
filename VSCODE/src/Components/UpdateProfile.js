import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UpdateProfile.css";

const UpdateProfile = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [modeOfDelivery, setModeOfDelivery] = useState("");
  const [farmerImage, setFarmerImage] = useState("");

  // New Bank Details Fields
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [branchName, setBranchName] = useState("");
  const [bankName, setBankName] = useState("");
  const [qrCodeImage, setQrCodeImage] = useState("");

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");

  useEffect(() => {
    // Fetch existing profile to populate the form
    axios
      .get(`http://localhost:8080/api/profiles/user/${userId}`)
      .then((response) => {
        const profile = response.data;
        setPhoneNumber(profile.phoneNumber);
        setAddress(profile.address);
        setState(profile.state);
        setModeOfDelivery(profile.modeOfDelivery);
        setFarmerImage(profile.farmerImage);

        // Set Bank Details
        setAccountNumber(profile.accountNumber);
        setIfscCode(profile.ifscCode);
        setBranchName(profile.branchName);
        setBankName(profile.bankName);
        setQrCodeImage(profile.qrCodeImage);
      })
      .catch(() => {
        setError("Error fetching profile details.");
      });
  }, [userId]);

  const handleImageUpload = (e, setImage) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImage(reader.result); // Set Base64 string
      };
      reader.onerror = () => {
        setError("Error converting image.");
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const profileData = {
      phoneNumber,
      address,
      state,
      modeOfDelivery,
      farmerImage, // Base64 image string

      // Bank Details
      accountNumber,
      ifscCode,
      branchName,
      bankName,
      qrCodeImage, // Base64 image string
    };

    try {
      await axios.put(`http://localhost:8080/api/profiles/user/${userId}`, profileData, {
        headers: {
          "Content-Type": "application/json", // Sending JSON data
        },
      });
      navigate("/profile"); // Navigate after update
    } catch (error) {
      setError("Error updating profile.");
    }
  };

  return (
    <div className="update-profile-container">
      <button onClick={() => navigate("/profile")} className="back-btn">
        <i className="fas fa-arrow-left"></i> Back
      </button>
      <h2>Update Profile</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>Phone Number:</label>
        <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} /><br />

        <label>Address:</label>
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} /><br />

        <label>State:</label>
        <input type="text" value={state} onChange={(e) => setState(e.target.value)} /><br />

        <label>Upload New Photo:</label>
        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setFarmerImage)} /><br />

        {/* Bank Details Section */}
        <h3>Bank Details</h3>
        <label>Account Number:</label>
        <input type="text" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} /><br />

        <label>IFSC Code:</label>
        <input type="text" value={ifscCode} onChange={(e) => setIfscCode(e.target.value)} /><br />

        <label>Branch Name:</label>
        <input type="text" value={branchName} onChange={(e) => setBranchName(e.target.value)} /><br />

        <label>Bank Name:</label>
        <input type="text" value={bankName} onChange={(e) => setBankName(e.target.value)} /><br />

        <label>QR Code Image:</label>
        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setQrCodeImage)} /><br />

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
