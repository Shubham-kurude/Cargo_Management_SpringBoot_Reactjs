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

  // Fetch origin suggestions
  const fetchOriginSuggestions = async (query) => {
    if (!query) {
      setOriginSuggestions([]);
      return;
    }
    try {
      const response = await fetch(`http://localhost:8080/api/cargo/origins?query=${query}`);
      if (response.ok) {
        const data = await response.json();
        setOriginSuggestions(data);
      } else {
        setOriginSuggestions([]);
      }
    } catch (error) {
      setOriginSuggestions([]);
    }
  };

  // Fetch destination suggestions
  const fetchDestinationSuggestions = async (query) => {
    if (!query) {
      setDestinationSuggestions([]);
      return;
    }
    try {
      const response = await fetch(`http://localhost:8080/api/cargo/destinations?query=${query}`);
      if (response.ok) {
        const data = await response.json();
        setDestinationSuggestions(data);
      } else {
        setDestinationSuggestions([]);
      }
    } catch (error) {
      setDestinationSuggestions([]);
    }
  };

  // Handle Origin input change
  const handleOriginChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, origin: value }));
    fetchOriginSuggestions(value);
    setShowOriginSuggestions(true);
  };

  // Handle Destination input change
  const handleDestinationChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, destination: value }));
    fetchDestinationSuggestions(value);
    setShowDestinationSuggestions(true);
  };

  // Select origin suggestion
  const handleOriginSuggestionClick = (suggestion) => {
    setFormData((prev) => ({ ...prev, origin: suggestion }));
    setShowOriginSuggestions(false);
  };

  // Select destination suggestion
  const handleDestinationSuggestionClick = (suggestion) => {
    setFormData((prev) => ({ ...prev, destination: suggestion }));
    setShowDestinationSuggestions(false);
  };

  // Handle other inputs normally
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form and save booking
  const handleSubmit = async (e) => {
    e.preventDefault();
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

      if (!response.ok) {
        throw new Error("Failed to submit quote");
      }

      const data = await response.json();
      alert(`Quote submitted successfully! Total Charge: ₹${data.totalCharge}`);

      // Reset form
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
      alert("Error submitting quote. Please try again.");
    }
  };

  return (
    <div className="quote-form-container">
      <div className="quote-form-image">
        <img className=""
          src="https://images.pexels.com/photos/26606364/pexels-photo-26606364.jpeg"
          alt="Cargo"
        />
      </div>
      <div className="quote-form-content">
      <div class="jumbotron">
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

          <div className="form-button">
            <button className="submitt" type="submit">
              Submit Quote
            </button>
            <Link to="/">
  <button className="btn" id="btnn">Back To Home</button>
</Link>
          </div>
        </form>
      </div>
     
    </div>
  );
};

export default GetQuote;
