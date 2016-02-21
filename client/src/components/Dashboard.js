import React, { Component, PropTypes } from 'react';
import FilterOptions from './FilterOptions';
import { connect } from 'react-redux';

class Dashboard extends Component {
    
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div className="dashboard">
                <h2>Dashboard</h2>
                <FilterOptions />
            </div>
            );
    }

}

export default connect()(Dashboard);
