import React, { PropTypes } from 'react';
import FilterItem from './FilterItem';

const FilterList = ({ filters }) => (
            <ul>
                {filters.map(f =>
                        <FilterItem
                            key={f.id}
                            title={f.title}
                            />
                        )}
            </ul>
        )

FilterList.propTypes = {
    filters: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired
    }).isRequired).isRequired
}

export default FilterList
