import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Dashboard extends Component {
    
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div className="dashboard">
                <h2>Dashboard</h2>
            </div>
            );
    }

}

export default connect()(Dashboard);
