import React, { useState } from "react";
import "./HotelsManagement.css";

const HotelsManagement = () => {
  const [hotels, setHotels] = useState([
    {
      id: 1,
      name: "Lalibela Lodge",
      location: "Lalibela",
      rating: 4.8,
      status: "Active",
    },
    {
      id: 2,
      name: "Simien Resort",
      location: "Gondar",
      rating: 4.7,
      status: "Active",
    },
    {
      id: 3,
      name: "Danakil Camp",
      location: "Afar",
      rating: 4.5,
      status: "Active",
    },
  ]);

  return (
    <div className="admin-management">
      <div className="admin-header">
        <h1>🏨 Manage Hotels</h1>
        <button className="add-btn">+ Add Hotel</button>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Location</th>
              <th>Rating</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {hotels.map((hotel) => (
              <tr key={hotel.id}>
                <td>{hotel.id}</td>
                <td>{hotel.name}</td>
                <td>{hotel.location}</td>
                <td>⭐ {hotel.rating}</td>
                <td>
                  <span
                    className={`status-badge ${hotel.status.toLowerCase()}`}
                  >
                    {hotel.status}
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

export default HotelsManagement;
