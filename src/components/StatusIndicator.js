import React from 'react';

const StatusIndicator = ({ setGroupBy }) => {
  const handleGroupChange = (e) => {
    setGroupBy(e.target.value);
  };

  return (
    <div className="status-indicator">
      <select onChange={handleGroupChange}>
        <option value="status">Group by Status</option>
        <option value="priority">Group by Priority</option>
        {/* Add more grouping options as necessary */}
      </select>
    </div>
  );
};

export default StatusIndicator;
