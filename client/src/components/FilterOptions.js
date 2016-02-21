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
        return (
                <div>
                    {this.props.filters.map(f =>
                            <button
                                key={f.id}
                                onClick={() => this.handleClick(f.title)}
                                >
                                {f.title}
                                </button>)
                                }

                </div>
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
