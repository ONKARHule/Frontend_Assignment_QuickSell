import React from 'react';

const Filters = ({ setSortOption, setFilteredTickets }) => {
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div className="filters">
      <select onChange={handleSortChange}>
        <option value="priority">Sort by Priority</option>
        <option value="title">Sort by Title</option>
        {/* Add more sorting options as necessary */}
      </select>
    </div>
  );
};

export default Filters;
