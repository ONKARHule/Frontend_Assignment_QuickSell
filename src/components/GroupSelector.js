import React from 'react';

const GroupSelector = ({ setGroupBy }) => {
  const handleGroupChange = (e) => {
    setGroupBy(e.target.value);
  };

  return (
    <div className="group-selector">
      <label htmlFor="group-by">Group by:</label>
      <select id="group-by" onChange={handleGroupChange}>
        <option value="status">Status</option>
        <option value="priority">Priority</option>
        {/* Add more grouping options as necessary */}
      </select>
    </div>
  );
};

export default GroupSelector;
