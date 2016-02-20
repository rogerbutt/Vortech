import React, { PropTypes } from 'react';

const FilterItem = ({ title }) => (
            <li>
                { title }
            </li>
        )

FilterItem.propTypes = {
    title: PropTypes.string.isRequired
}

export default FilterItem
