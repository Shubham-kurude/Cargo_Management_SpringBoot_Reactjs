import React, { useEffect, useState } from "react";
import axios from "axios";

function GetAllBookedCargos() {
  const [cargos, setCargos] = useState([]);

  useEffect(() => {
    fetchCargos();
  }, []);

  const fetchCargos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/cargo/getAllCargoBooked");
      setCargos(response.data);
    } catch (error) {
      console.error("Error fetching cargos", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>All Booked Cargos</h2>
      <table className="table table-bordered table-striped">
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
          </tr>
        </thead>
        <tbody>
          {cargos.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center">
                No cargo records found
              </td>
            </tr>
          ) : (
            cargos.map((cargo) => (
              <tr key={cargo.id}>
                <td>{cargo.id}</td>
                <td>{cargo.origin}</td>
                <td>{cargo.destination}</td>
                <td>{cargo.length}</td>
                <td>{cargo.width}</td>
                <td>{cargo.height}</td>
                <td>{cargo.weight}</td>
                <td>{cargo.totalCharge}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default GetAllBookedCargos;
