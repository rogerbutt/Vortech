import React, { Component, PropTypes } from 'react';
import FilterOptions from './FilterOptions';
import MoneyPlot from './MoneyPlot';
import { connect } from 'react-redux';

class Dashboard extends Component {
    
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {dispatch, filters} = this.props;
    }

    render () {
        const { dispatch, filters } = this.props;

        console.log('here');
        console.log(filters);
        var plots = [];
            
        filters.map((f) => {
            if(f.receipts && f.action === 2) {
                plots.push(<MoneyPlot filter={f} />);
            }
        });

        console.log(plots)

        return (
            <div className="dashboard">
                <h2>Dashboard</h2>
                {plots}
            </div>
            );
    }

}

Dashboard.propTypes = {
    filters: PropTypes.array.isRequired,
}

function mapStateToProps(state) {
    const filters = state.filter.filters;

    return {
        filters
    }
}

export default connect(mapStateToProps)(Dashboard);
