import React from 'react';

const SortedOptions = ({ sortOption }) => {
  return (
    <div className="sorted-options">
      <h3>Sorted By: {sortOption}</h3>
    </div>
  );
};

export default SortedOptions;
