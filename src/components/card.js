import React from 'react';

const Card = ({ ticket }) => {
  return (
    <div className="card">
      <h3>{ticket.title}</h3>
      <p>Status: {ticket.status}</p>
      <p>Priority: {ticket.priority}</p>
      {/* Include other ticket details as needed */}
    </div>
  );
};

export default Card;
