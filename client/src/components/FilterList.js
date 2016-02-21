import React, { PropTypes } from 'react';
import FilterItem from './FilterItem';

function interp(action) {
    switch(action) {
        case 0:
            return "Flight Info";

        case 1:
            return "Donate";

        case 2:
            return "Plot";
        default:
            return action;
    }
}


const FilterList = ({ filters, makeNewRecipe }) => (
            <div className="filter-list">
                <button onClick={() => makeNewRecipe() }>
                    Make New Recipe
                </button>

                <ul>
                    {filters.map(f =>
                            <FilterItem
                                key={f.id}
                                title={f.title}
                                action={interp(f.action)}
                                />
                        )}
                </ul>
            </div>
        )

FilterList.propTypes = {
    filters: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
    }).isRequired).isRequired,
    makeNewRecipe: PropTypes.func.isRequired,
}

export default FilterList
