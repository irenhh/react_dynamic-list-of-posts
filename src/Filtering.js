import React from 'react';
import PropTypes from 'prop-types';

function Filtering(props) {
  const { isLoaded, filterBy } = props;

  return (
    isLoaded && (
      <div>
        <input
          type="search"
          placeholder="Filter by..."
          onChange={filterBy}
          className="filter-input"
        />
      </div>
    )
  );
}

Filtering.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  filterBy: PropTypes.func.isRequired,
};

export default Filtering;
