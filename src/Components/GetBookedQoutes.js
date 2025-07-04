import React, { useEffect, useState } from "react";
import axios from "axios";
import './BookedCargoList.css';
import Navbar from "./Navbar";
function GetBookedQoutes() {
  const [cargos, setCargos] = useState([]);

  useEffect(() => {
    fetchCargos();
  }, []);

  const fetchCargos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/cargo/getAllCargoBooked");
      setCargos(response.data);
    } catch (error) {
      console.error("Error fetching cargo quotes:", error);
    }
  };

  return (
    <div className="table-container">
      <Navbar/>
    <div class="jumbotron">
          <h3>Booked Qouted By Customers</h3>
       </div> 
  
    <table className="table table-hover">
      <thead>
        <tr>
          <th>ID</th>
          <th>Origin</th>
          <th>Destination</th>
          <th>Length</th>
          <th>Width</th>
          <th>Height</th>
          <th>Weight</th>
          <th>Total Charge</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {cargos.map((cargo) => (
          <tr key={cargo.id}>
            <td>{cargo.id}</td>
            <td>{cargo.origin}</td>
            <td>{cargo.destination}</td>
            <td>{cargo.length}</td>
            <td>{cargo.width}</td>
            <td>{cargo.height}</td>
            <td>{cargo.weight}</td>
            <td>₹ {cargo.totalCharge}</td>
            <td className="action-buttons">
              <button className="approve">Approve</button>
              <button className="reject">Reject</button>
              <button className="update">Update</button>
              <button className="delete">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
}

export default GetBookedQoutes;
