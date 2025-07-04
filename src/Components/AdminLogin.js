import React, { useState } from "react";
import "../Components/AdminLogin.css";
import { Link, useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [formData, setFormData] = useState({ username: "Admin", password: "Admin@123" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple check for username and password
    if (formData.username === "Admin" && formData.password === "Admin@123") {
      // Navigate to GetBookedQoutes page
      navigate("/getAllCargo");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="quote-form-container">
      <div className="quote-form-image">
        <img
          src="https://images.pexels.com/photos/26606364/pexels-photo-26606364.jpeg"
          alt="Cargo"
        />
      </div>
      <div className="quote-form-content">
        <div className="jumbotron">
          <h3>Admin Login</h3>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid" style={{ maxWidth: "400px", margin: "auto" }}>
            <div className="form-group">
              <label>Username or Email</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username or email"
                autoComplete="username"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />
            </div>
          </div>

          <div className="form-button" style={{ marginTop: "20px" }}>
            <button className="submitt" type="submit" id="btnn">
              Login
            </button>

            <Link to="/">
              <button className="" id="btnn" style={{ marginLeft: "10px" }}>
                Back To Home
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
