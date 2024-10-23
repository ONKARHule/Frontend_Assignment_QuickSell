import React from 'react';

const DisplayState = ({ ticketCount }) => {
  return (
    <div className="display-state">
      <h3>Total Tickets: {ticketCount}</h3>
    </div>
  );
};

export default DisplayState;
