import React, { Component, PropTypes } from 'react';
import FilterSelect from './FilterSelect'
import FilterList from './FilterList';
import RecipeReview from './RecipeReview'
import { connect } from 'react-redux';
import { startNewRecipe } from '../actions/filter';

class RecipeFlow extends Component {

    constructor(props) {
        super(props);
        this.makeNewRecipe = this.makeNewRecipe.bind(this);
    }

    componentDidMount() {
        const { dispatch, newFilterStatus, filters } = this.props;
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.newRecipeStatus !== this.props.newRecipeStatus) {
            const { dispatch, newFilterStatus, filters } = nextProps;
        }
    }

    makeNewRecipe() {
        dispatch(startNewRecipe());
    }

    render () {

        var slide = null;
        const filters = this.props.filters;
        
        switch(this.props.newFilterStatus) {
            case -1:
                slide = <FilterList filters={filters} />;
                break;

            case 0:
                slide = <FilterSelect />;
                break;

            case 1:
                slide = <RecipeReview />;
                break;

            default:
                slide = <FilterSelect />;
        }

        return (
                <div>
                    {slide}
                </div>
               );
    }

}

RecipeFlow.propTypes = {
    newFilterStatus: PropTypes.number.isRequired,
    filters: PropTypes.array.isRequired,
}

function mapStateToProps(state) {
    const newFilterStatus = state.filter.newFilterStatus;
    const filters = state.filter.filters;

    return {
        newFilterStatus,
        filters,
    }
}


export default connect(
mapStateToProps)(RecipeFlow);
