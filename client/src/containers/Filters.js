import React, { PropTypes, Component } from 'react';
import FilterList from '../components/FilterList';
import { connect } from 'react-redux';

class Filters extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {
            dispatch,
            filters
        } = this.props;
    }

    render () {
    
        const filters = this.props.filters;

        return (
                    <div>
                        <div>
                            <h1>Recipes</h1>
                            <button>Make New Recipe</button>
                        </div>
                        <FilterList filters={filters} />
                    </div>
               );

    }

}

Filters.propTypes = {
    filters: PropTypes.array.isRequired,
};

function mapStateProps(state) {
    const filters = state.filter.filters;

    return {
        filters,
    }
}

export default connect(
mapStateProps)(Filters)
