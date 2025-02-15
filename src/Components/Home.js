import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Welcome from "./Welcome.jpg";
import Home1 from "./Home1.jpg";
import Home2 from "./Home2.jpg";
import Home3 from "./Home3.jpg";

const Home = () => {
  const images = [Welcome, Home1, Home2, Home3];

  return (
    <div className="home-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo">Harvest Hub<br/></div>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      
      </nav>

      {/* Hero Section */}
      <div className="hero-section" id="home">
        {/* Image Container for sliding images */}
        <div className="image-container">
          {images.map((image, index) => (
            <img key={index} src={image} alt={`Slide ${index + 1}`} />
          ))}
          {/* Duplicated images for smooth looping */}
          <img src={Welcome} alt="Duplicate Slide 1" />
          <img src={Home1} alt="Duplicate Slide 2" />
        </div>

        {/* Text Overlay */}
        <div className="hero-text">
          <h1>Fresh Spices, Direct from Farmers</h1>
          <p>Support local farmers and get the best quality spices directly from the source.</p>
          
          <Link to="/login" className="login-to-explore-btn">Explore The Taste of Traditon</Link>
        </div>
      </div>

      {/* About Section */}
      <div className="about-section" id="about">
        <h2>About Us</h2>
        <p>
          Harvest Hub is dedicated to connecting local farmers with customers who value<br/>
          fresh, high-quality spices. By purchasing directly from farmers, you not only<br/>
          get the best products but also support sustainable farming practices.
        </p>

      </div>

      {/* Contact Section */}
      <div className="contact-section" id="contact">
        <h2>Contact Us</h2>
        <p>For Support Contact Us</p>
        <p>Email: support@harvesthub.com</p>
        <p>Phone: +1 234 567 890</p>
        
      </div>
    </div>
  );
};

export default Home;
