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

        console.log(filters);
        return (
            <div className="dashboard">
                <h2>Dashboard</h2>
                <FilterOptions />
                {filters.map(f => {if(f.action === 3)  <MoneyPlot filter={f}  />})}
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
