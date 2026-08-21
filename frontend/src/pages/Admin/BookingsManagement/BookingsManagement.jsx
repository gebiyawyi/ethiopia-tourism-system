import React, { useState } from "react";
import "./BookingsManagement.css";

const BookingsManagement = () => {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      reference: "TRIP-001",
      user: "John Doe",
      total: 3700,
      status: "Confirmed",
    },
    {
      id: 2,
      reference: "TRIP-002",
      user: "Jane Smith",
      total: 1800,
      status: "Pending",
    },
    {
      id: 3,
      reference: "TRIP-003",
      user: "Mike Johnson",
      total: 2500,
      status: "Completed",
    },
  ]);

  return (
    <div className="admin-management">
      <div className="admin-header">
        <h1>📋 Manage Bookings</h1>
        <button className="add-btn">+ Add Booking</button>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Reference</th>
              <th>User</th>
              <th>Total ($)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.reference}</td>
                <td>{booking.user}</td>
                <td>${booking.total}</td>
                <td>
                  <span
                    className={`status-badge ${booking.status.toLowerCase()}`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td>
                  <button className="edit-btn">View</button>
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

export default BookingsManagement;
