import React from "react";
import "./EventCard.css";

const EventCard = ({
  title,
  description,
  startDate,
  endDate,
  image,
  location,
  category,
}) => {
  // Format date
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Get category color
  const getCategoryColor = (cat) => {
    const colors = {
      cultural: "#d97706",
      religious: "#7c3aed",
      festival: "#dc2626",
      seasonal: "#059669",
      sports: "#2563eb",
    };
    return colors[cat?.toLowerCase()] || "#6b7280";
  };

  return (
    <div className="event-card">
      <div className="event-image">
        <img src={image} alt={title} />
        <span
          className="event-category"
          style={{ background: getCategoryColor(category) }}
        >
          {category || "Event"}
        </span>
      </div>
      <div className="event-content">
        <h3 className="event-title">{title}</h3>
        <p className="event-description">{description}</p>
        <div className="event-details">
          <div className="event-date">
            <span className="event-icon">📅</span>
            <div>
              <span className="event-label">Starts:</span>
              <span className="event-value">{formatDate(startDate)}</span>
            </div>
          </div>
          {endDate && endDate !== startDate && (
            <div className="event-date">
              <span className="event-icon">📅</span>
              <div>
                <span className="event-label">Ends:</span>
                <span className="event-value">{formatDate(endDate)}</span>
              </div>
            </div>
          )}
          {location && (
            <div className="event-location">
              <span className="event-icon">📍</span>
              <span className="event-value">{location}</span>
            </div>
          )}
        </div>
        <button className="event-btn">Learn More →</button>
      </div>
    </div>
  );
};

export default EventCard;
