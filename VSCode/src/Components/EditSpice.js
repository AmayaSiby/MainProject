import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Editspice.css'; // Import CSS for styling

const EditSpice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [spice, setSpice] = useState({
    name: '',
    spicePhoto: '',
    quantity: '',
    minPriceLevel: '',
    availability: '',
    amountOfAvailability: '',
    farmerAddress: '',
    farmerPhoneNumber: '',
    description: '',
    farmerEmail: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:8080/api/spices/${id}`)
      .then(response => setSpice(response.data))
      .catch(error => console.error('Error fetching spice data:', error));
  }, [id]);

  const handleChange = (e) => {
    setSpice({
      ...spice,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSpice({ ...spice, spicePhoto: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put('http://localhost:8080/api/spices/edit', spice)
      .then(() => {
        alert('Spice updated successfully!');
        navigate(-1);
      })
      .catch(error => console.error('Error updating spice:', error));
  };

  return (
    <div className="spice-edit-container">
      <h2 className="spice-edit-title">Edit Spice</h2>
      <form onSubmit={handleSubmit} className="spice-edit-form">
        
        <div className="spice-edit-group">
          <label className="spice-edit-label">Spice Name:</label>
          <input className="spice-edit-input" type="text" name="name" value={spice.name} onChange={handleChange} required />
        </div>

        <div className="spice-edit-group">
          <label className="spice-edit-label">Quantity:</label>
          <input 
            className="spice-edit-input" 
            type="number" 
            name="quantity" 
            value={spice.quantity} 
            onChange={handleChange} 
            required 
            disabled={spice.availability === 'Not Available'} // Disable if Not Available
          />
        </div>

        <div className="spice-edit-group">
          <label className="spice-edit-label">Min Price Level:</label>
          <input className="spice-edit-input" type="number" name="minPriceLevel" value={spice.minPriceLevel} onChange={handleChange} required />
        </div>

        <div className="spice-edit-group">
          <label className="spice-edit-label">Availability:</label>
          <select 
            className="spice-edit-input" 
            name="availability" 
            value={spice.availability} 
            onChange={handleChange} 
            required
          >
            <option value="Available">Available</option>
            <option value="Not Available">Not Available</option>
          </select>
        </div>

        {/* Conditionally render amountOfAvailability field if the spice is available */}
        {spice.availability === 'Available' && (
          <div className="spice-edit-group">
            <label className="spice-edit-label">Amount of Availability:</label>
            <input 
              className="spice-edit-input" 
              type="number" 
              name="amountOfAvailability" 
              value={spice.amountOfAvailability} 
              onChange={handleChange} 
              required 
            />
          </div>
        )}

        <div className="spice-edit-group">
          <label className="spice-edit-label">Farmer Address:</label>
          <input className="spice-edit-input" type="text" name="farmerAddress" value={spice.farmerAddress} onChange={handleChange} required />
        </div>

        <div className="spice-edit-group">
          <label className="spice-edit-label">Farmer Phone Number:</label>
          <input className="spice-edit-input" type="text" name="farmerPhoneNumber" value={spice.farmerPhoneNumber} onChange={handleChange} required />
        </div>

        <div className="spice-edit-group">
          <label className="spice-edit-label">Description:</label>
          <textarea className="spice-edit-textarea" name="description" value={spice.description} onChange={handleChange} required></textarea>
        </div>

        <div className="spice-edit-group">
          <label className="spice-edit-label">Farmer Email:</label>
          <input className="spice-edit-input" type="email" name="farmerEmail" value={spice.farmerEmail} onChange={handleChange} required />
        </div>

        <div className="spice-edit-group">
          <label className="spice-edit-label">Spice Image:</label>
          <input className="spice-edit-input" type="file" accept="image/*" onChange={handleImageUpload} />
          {spice.spicePhoto && (
            <img src={spice.spicePhoto} alt="Spice Preview" className="spice-edit-preview" />
          )}
        </div>

        <button type="submit" className="spice-edit-btn">Update Spice</button>
      </form>
    </div>
  );
};

export default EditSpice;
