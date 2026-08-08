import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBookings: 0,
    totalDestinations: 0,
    totalHotels: 0,
    recentBookings: [],
    recentUsers: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call - replace with actual backend call
    const fetchStats = () => {
      setStats({
        totalUsers: 234,
        totalBookings: 156,
        totalDestinations: 22,
        totalHotels: 45,
        recentBookings: [
          {
            id: 1,
            user: "John Doe",
            destination: "Lalibela",
            date: "2026-01-15",
            status: "confirmed",
            amount: 1200,
          },
          {
            id: 2,
            user: "Sarah Smith",
            destination: "Simien Mountains",
            date: "2026-01-14",
            status: "pending",
            amount: 1500,
          },
          {
            id: 3,
            user: "Michael Brown",
            destination: "Danakil Depression",
            date: "2026-01-13",
            status: "confirmed",
            amount: 1800,
          },
          {
            id: 4,
            user: "Emma Wilson",
            destination: "Omo Valley",
            date: "2026-01-12",
            status: "confirmed",
            amount: 1100,
          },
          {
            id: 5,
            user: "James Taylor",
            destination: "Axum",
            date: "2026-01-11",
            status: "cancelled",
            amount: 900,
          },
        ],
        recentUsers: [
          {
            id: 1,
            name: "Alice Johnson",
            email: "alice@example.com",
            joined: "2026-01-15",
          },
          {
            id: 2,
            name: "Bob Williams",
            email: "bob@example.com",
            joined: "2026-01-14",
          },
          {
            id: 3,
            name: "Carol Davis",
            email: "carol@example.com",
            joined: "2026-01-13",
          },
        ],
      });
      setLoading(false);
    };

    fetchStats();
  }, []);

  const getStatusBadge = (status) => {
    const classes = {
      confirmed: "status-confirmed",
      pending: "status-pending",
      cancelled: "status-cancelled",
    };
    return classes[status] || "";
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="container">
        {/* Header */}
        <div className="dashboard-header">
          <div>
            <h1>📊 Admin Dashboard</h1>
            <p>Welcome back, Admin! Here's what's happening today</p>
          </div>
          <div className="dashboard-actions">
            <button className="refresh-btn">🔄 Refresh</button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">👤</div>
            <div className="stat-info">
              <span className="stat-number">{stats.totalUsers}</span>
              <span className="stat-label">Total Users</span>
              <span className="stat-change positive">+12% this month</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📋</div>
            <div className="stat-info">
              <span className="stat-number">{stats.totalBookings}</span>
              <span className="stat-label">Total Bookings</span>
              <span className="stat-change positive">+8% this month</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📍</div>
            <div className="stat-info">
              <span className="stat-number">{stats.totalDestinations}</span>
              <span className="stat-label">Destinations</span>
              <span className="stat-change">+3 new this month</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🏨</div>
            <div className="stat-info">
              <span className="stat-number">{stats.totalHotels}</span>
              <span className="stat-label">Hotels</span>
              <span className="stat-change">+5 new this month</span>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="dashboard-grid">
          {/* Recent Bookings */}
          <div className="dashboard-card recent-bookings">
            <div className="card-header">
              <h3>📋 Recent Bookings</h3>
              <Link to="/admin/bookings" className="view-all">
                View All →
              </Link>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Destination</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.user}</td>
                    <td>{booking.destination}</td>
                    <td>{booking.date}</td>
                    <td>${booking.amount}</td>
                    <td>
                      <span
                        className={`status-badge ${getStatusBadge(booking.status)}`}
                      >
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Quick Actions */}
          <div className="dashboard-card quick-actions">
            <h3>⚡ Quick Actions</h3>
            <div className="action-grid">
              <Link to="/admin/destinations/new" className="action-btn">
                ➕ Add Destination
              </Link>
              <Link to="/admin/hotels/new" className="action-btn">
                ➕ Add Hotel
              </Link>
              <Link to="/admin/destinations" className="action-btn">
                📍 Manage Destinations
              </Link>
              <Link to="/admin/hotels" className="action-btn">
                🏨 Manage Hotels
              </Link>
              <Link to="/admin/bookings" className="action-btn">
                📋 Manage Bookings
              </Link>
              <Link to="/admin/users" className="action-btn">
                👤 Manage Users
              </Link>
            </div>
          </div>

          {/* Recent Users */}
          <div className="dashboard-card recent-users">
            <div className="card-header">
              <h3>👤 Recent Users</h3>
              <Link to="/admin/users" className="view-all">
                View All →
              </Link>
            </div>
            <div className="user-list">
              {stats.recentUsers.map((user) => (
                <div key={user.id} className="user-item">
                  <div className="user-avatar">{user.name.charAt(0)}</div>
                  <div className="user-info">
                    <span className="user-name">{user.name}</span>
                    <span className="user-email">{user.email}</span>
                  </div>
                  <span className="user-joined">Joined {user.joined}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
