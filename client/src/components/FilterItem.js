import React, { PropTypes } from 'react';


function interpret(action) {
    switch(parseInt(action)) {
            case 0:
                return "Extract Flight Data";

            case 1:
                return "Donate";
            
            default:
                return action;
    }
}

const FilterItem = ({ title, action }) => (
            <li className="filter-item">
                <span>{ title }</span>
                <i className="fa fa-arrow-right"></i>
                <span>{ interpret(action) }</span>
            </li>
        )

FilterItem.propTypes = {
    title: PropTypes.string.isRequired
}

export default FilterItem
