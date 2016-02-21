import React, { PropTypes } from 'react';

const FilterItem = ({ title }) => (
            <li className="filter-item">
                { title }
            </li>
        )

FilterItem.propTypes = {
    title: PropTypes.string.isRequired
}

export default FilterItem
