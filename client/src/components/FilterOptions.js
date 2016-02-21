import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectEmailFilter } from '../actions/email'; 

class FilterOptions extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }


    componentDidMount() {
        const { dispatch, filters } = this.props;
    }

    handleClick(id) {
        this.props.dispatch(selectEmailFilter(id));
    }

    render () {
        var id = 0;
        console.log(this.props.filters);
        return (
                <ul className="filters-options">
                    {this.props.filters.map(f =>
                            <li
                                key={id++}
                                onClick={() => this.handleClick(f.title)}
                                >
                                {f.title}
                                </li>)
                                }

                </ul>
               );
    }
}

FilterOptions.propTypes = {
    filters: PropTypes.array.isRequired,
}

function mapStateToProps(state) {
    const filters = state.filter.filters;

    return {
        filters
    }
}

export default connect(mapStateToProps)(FilterOptions)
