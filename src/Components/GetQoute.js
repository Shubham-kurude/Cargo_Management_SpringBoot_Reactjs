import React, { useState } from "react";
import "../Components/GetQoute.css";
import { Link } from "react-router-dom";

const GetQuote = () => {
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    length: "",
    width: "",
    height: "",
    weight: "",
    total_charge: "",
  });

  const [originSuggestions, setOriginSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [showOriginSuggestions, setShowOriginSuggestions] = useState(false);
  const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchOriginSuggestions = async (query) => {
    if (!query) return setOriginSuggestions([]);
    try {
      const response = await fetch(`http://localhost:8080/api/cargo/origins?query=${query}`);
      if (response.ok) {
        const data = await response.json();
        setOriginSuggestions(data);
      }
    } catch {
      setOriginSuggestions([]);
    }
  };

  const fetchDestinationSuggestions = async (query) => {
    if (!query) return setDestinationSuggestions([]);
    try {
      const response = await fetch(`http://localhost:8080/api/cargo/destinations?query=${query}`);
      if (response.ok) {
        const data = await response.json();
        setDestinationSuggestions(data);
      }
    } catch {
      setDestinationSuggestions([]);
    }
  };

  const handleOriginChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, origin: value }));
    fetchOriginSuggestions(value);
    setShowOriginSuggestions(true);
  };

  const handleDestinationChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, destination: value }));
    fetchDestinationSuggestions(value);
    setShowDestinationSuggestions(true);
  };

  const handleOriginSuggestionClick = (item) => {
    setFormData((prev) => ({ ...prev, origin: item }));
    setShowOriginSuggestions(false);
  };

  const handleDestinationSuggestionClick = (item) => {
    setFormData((prev) => ({ ...prev, destination: item }));
    setShowDestinationSuggestions(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:8080/api/cargo/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          origin: formData.origin,
          destination: formData.destination,
          length: Number(formData.length),
          width: Number(formData.width),
          height: Number(formData.height),
          weight: Number(formData.weight),
        }),
      });

      if (!response.ok) throw new Error("Quote submission failed");

      const data = await response.json();

      setSuccess(`
✅ Quote submitted successfully!

Origin: ${formData.origin}
Destination: ${formData.destination}
Dimensions: ${formData.length}cm x ${formData.width}cm x ${formData.height}cm
Weight: ${formData.weight}kg
Total Charge: ₹${data.totalCharge}
      `);

      setFormData({
        origin: "",
        destination: "",
        length: "",
        width: "",
        height: "",
        weight: "",
        total_charge: "",
      });
    } catch (error) {
      console.error(error);
      setError("❌ No delivery available at that location. Contact Shubham.s.kurude@gmail.com");
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
          <h3>Get Quick Quote</h3>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group" style={{ position: "relative" }}>
              <label>Origin</label>
              <input
                type="text"
                name="origin"
                value={formData.origin}
                onChange={handleOriginChange}
                placeholder="Enter Origin"
                autoComplete="off"
                required
              />
              {showOriginSuggestions && originSuggestions.length > 0 && (
                <ul className="suggestions-list">
                  {originSuggestions.map((item, index) => (
                    <li
                      key={index}
                      onClick={() => handleOriginSuggestionClick(item)}
                      className="suggestion-item"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="form-group" style={{ position: "relative" }}>
              <label>Destination</label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleDestinationChange}
                placeholder="Enter Destination"
                autoComplete="off"
                required
              />
              {showDestinationSuggestions && destinationSuggestions.length > 0 && (
                <ul className="suggestions-list">
                  {destinationSuggestions.map((item, index) => (
                    <li
                      key={index}
                      onClick={() => handleDestinationSuggestionClick(item)}
                      className="suggestion-item"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="form-group">
              <label>Length (cm)</label>
              <input
                type="number"
                name="length"
                value={formData.length}
                onChange={handleChange}
                placeholder="Enter Length"
                required
              />
            </div>
            

            <div className="form-group">
              <label>Width (cm)</label>
              <input
                type="number"
                name="width"
                value={formData.width}
                onChange={handleChange}
                placeholder="Enter Width"
                required
              />
            </div>

            <div className="form-group">
              <label>Height (cm)</label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                placeholder="Enter Height"
                required
              />
            </div>

            <div className="form-group">
              <label>Weight (kg)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="Enter Weight"
                required
              />
            </div>
          </div>

          {error && (
            <div className="error-message">
              <p>{error}</p>
              <button className="error-ok-button" onClick={() => setError("")}>
                OK
              </button>
            </div>
          )}

{success && (
  <div
    style={{
      position: "fixed",
      top: 0, left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.4)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
    }}
  >
    <div
      style={{
        background: 'linear-gradient(90deg, #7be1ec, #3983d8, #6bdce9)',
        color: "white",
        padding: "25px 35px",
        borderRadius: "12px",
        maxWidth: "450px",
        width: "90%",
        boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
        fontWeight: "600",
        whiteSpace: "pre-wrap",
        textAlign: "center",
      }}
    >
      <pre style={{
        marginBottom: "20px",
        borderBottom: "1px solid rgba(255,255,255,0.3)",
        paddingBottom: "15px",
      }}>
        {success}
      </pre>
      <button
        onClick={() => setSuccess("")}
        style={{
          padding: "10px 30px",
          backgroundColor: "white",
          color: "#2ecc71",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "bold",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = "#f1f1f1"}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = "white"}
      >
        OK
      </button>
    </div>
  </div>
)}


          <div className="form-button">
            <button className="submitt" type="submit" id="btnn">
              Submit Quote
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

export default GetQuote;
