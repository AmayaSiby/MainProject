import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./AddSpices.css"; // CSS file

const AddSpices = () => {
  const [newSpice, setNewSpice] = useState({
    farmerEmail: "",
    name: "",
    spicePhoto: "",
    quantity: "",
    minPriceLevel: "",
    availability: "Select",
    amountOfAvailability: "",
    farmerAddress: "",
    farmerPhoneNumber: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSpice({ ...newSpice, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewSpice({ ...newSpice, spicePhoto: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSpice = async () => {
    const formData = new FormData();
    formData.append("farmerEmail", newSpice.farmerEmail);
    formData.append("name", newSpice.name);
    formData.append("spicePhoto", newSpice.spicePhoto);
    formData.append("quantity", newSpice.quantity);
    formData.append("minPriceLevel", newSpice.minPriceLevel);
    formData.append("availability", newSpice.availability);
    formData.append("amountOfAvailability", newSpice.amountOfAvailability);
    formData.append("farmerAddress", newSpice.farmerAddress);
    formData.append("farmerPhoneNumber", newSpice.farmerPhoneNumber);
    formData.append("description", newSpice.description);

    try {
      const response = await axios.post("http://localhost:8080/api/spices/add", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      alert("Spice has been added successfully!"); // Success alert
      window.location.reload(); 
    } catch (error) {
      console.error("Error adding spice:", error);
    }
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <nav className="sidebar">
        <h2 className="sidebar-title">Harvest Hub</h2>
        <ul>
        <li><Link to="/farmer-dashboard">Home</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          
          <li><Link to="/farmorder">Orders</Link></li>
          <li><Link to="/knowledgehub">Knowledge Hub</Link></li>
        </ul>
        <div className="logout">
          <Link to="/logout">Logout</Link>
        </div>
      </nav>

      {/* Add Spice Form */}
      <div className="add-spice-container">
        <h3>Add New Spice</h3>
        <div className="input-group">
          <label htmlFor="farmerEmail">Email</label>
          <input type="email" id="farmerEmail" name="farmerEmail" placeholder="Email" value={newSpice.farmerEmail} onChange={handleInputChange} />
        </div>
        <div className="input-group">
          <label htmlFor="name">Spice Name</label>
          <input type="text" id="name" name="name" placeholder="Spice Name" value={newSpice.name} onChange={handleInputChange} />
        </div>
        <div className="input-group">
          <label htmlFor="spicePhoto">Spice Photo</label>
          <input type="file" id="spicePhoto" name="spicePhoto" onChange={handleImageUpload} />
        </div>
        <div className="input-group">
          <label htmlFor="quantity">Quantity</label>
          <input type="number" id="quantity" name="quantity" placeholder="Quantity" value={newSpice.quantity} onChange={handleInputChange} />
        </div>
        <div className="input-group">
          <label htmlFor="minPriceLevel">Min Price Level</label>
          <input type="number" id="minPriceLevel" name="minPriceLevel" placeholder="Min Price Level" value={newSpice.minPriceLevel} onChange={handleInputChange} />
        </div>
        <div className="input-group">
          <label htmlFor="availability">Availability</label>
          <select id="availability" name="availability" value={newSpice.availability} onChange={handleInputChange}>
            <option value="Select">Select</option>
            <option value="Available">Available</option>
            <option value="Not Available">Not Available</option>
          </select>
        </div>
        {newSpice.availability === "Available" && (
          <div className="input-group">
            <label htmlFor="amountOfAvailability">Amount of Availability</label>
            <input type="number" id="amountOfAvailability" name="amountOfAvailability" placeholder="Amount of Availability" value={newSpice.amountOfAvailability} onChange={handleInputChange} />
          </div>
        )}
        <div className="input-group">
          <label htmlFor="farmerAddress">Farmer Address</label>
          <input type="text" id="farmerAddress" name="farmerAddress" placeholder="Farmer Address" value={newSpice.farmerAddress} onChange={handleInputChange} />
        </div>
        <div className="input-group">
          <label htmlFor="farmerPhoneNumber">Farmer Phone Number</label>
          <input type="text" id="farmerPhoneNumber" name="farmerPhoneNumber" placeholder="Farmer Phone Number" value={newSpice.farmerPhoneNumber} onChange={handleInputChange} />
        </div>
        <div className="input-group">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" placeholder="Description" value={newSpice.description} onChange={handleInputChange} />
        </div>
        <button onClick={handleAddSpice}>Add Spice</button>
      </div>
    </div>
  );
};

export default AddSpices;
