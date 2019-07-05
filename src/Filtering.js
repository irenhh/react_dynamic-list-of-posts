import React from 'react';
import PropTypes from 'prop-types';

function Filtering(props) {
  return (
    <div>
      <input
        type="search"
        placeholder="Filter by..."
        onChange={props.filterBy}
        className="filter-input"
      />
    </div>
  );
}

Filtering.propTypes = {
  filterBy: PropTypes.func.isRequired,
};

export default Filtering;
