import React, { useState } from "react";
import "./DestinationsManagement.css";

const DestinationsManagement = () => {
  const [destinations, setDestinations] = useState([
    {
      id: 1,
      name: "Lalibela Rock Churches",
      region: "Amhara",
      status: "Active",
    },
    { id: 2, name: "Simien Mountains", region: "Amhara", status: "Active" },
    { id: 3, name: "Danakil Depression", region: "Afar", status: "Active" },
  ]);

  return (
    <div className="admin-management">
      <div className="admin-header">
        <h1>📍 Manage Destinations</h1>
        <button className="add-btn">+ Add Destination</button>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Region</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {destinations.map((dest) => (
              <tr key={dest.id}>
                <td>{dest.id}</td>
                <td>{dest.name}</td>
                <td>{dest.region}</td>
                <td>
                  <span className={`status-badge ${dest.status.toLowerCase()}`}>
                    {dest.status}
                  </span>
                </td>
                <td>
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DestinationsManagement;
