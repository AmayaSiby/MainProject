import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CreateProfile.css"; // Import the CSS file

const CreateDetails = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [modeOfDelivery, setModeOfDelivery] = useState("");
  const [farmerImage, setFarmerImage] = useState(null);
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [branchName, setBranchName] = useState("");
  const [bankName, setBankName] = useState("");
  const [qrCodeImage, setQrCodeImage] = useState(null);
  const [error, setError] = useState("");
  const history = useNavigate();

  const userId = localStorage.getItem("id");

  // Function to convert image file to Base64
  const handleFileChange = (e, setImage) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set Base64 string
      };
      reader.readAsDataURL(file); // Convert file to Base64
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/api/profiles", {
        user: { id: userId },
        phoneNumber,
        address,
        state,
        modeOfDelivery,
        farmerImage, // Base64 string
        accountNumber,
        ifscCode,
        branchName,
        bankName,
        qrCodeImage, // Base64 string
      });
      history("/profile");
    } catch (error) {
      setError("Error creating profile.");
    }
  };

  const handleBack = () => {
    history("/farmer-dashboard"); // Navigating back to profile page
  };

  return (
    <div className="create-profile-container">
      {/* Back Button */}
      <button className="back-btn" onClick={handleBack}>
        <i className="fas fa-arrow-left"></i> Back
      </button>

      <h2>Create Profile</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <input
          type="text"
          placeholder="Mode of Delivery"
          value={modeOfDelivery}
          onChange={(e) => setModeOfDelivery(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          placeholder="Farmer Image"
          onChange={(e) => handleFileChange(e, setFarmerImage)}
        />

        <h3>Bank Details</h3>
        <input
          type="text"
          placeholder="Account Number"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="IFSC Code"
          value={ifscCode}
          onChange={(e) => setIfscCode(e.target.value)}
        />
        <input
          type="text"
          placeholder="Branch Name"
          value={branchName}
          onChange={(e) => setBranchName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Bank Name"
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          placeholder="QR Code Image"
          onChange={(e) => handleFileChange(e, setQrCodeImage)}
        />

        <button type="submit">Create Profile</button>
      </form>
    </div>
  );
};

export default CreateDetails;
