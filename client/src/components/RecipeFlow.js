import React, { Component, PropTypes } from 'react';
import FilterSelect from './FilterSelect'
import RecipeReview from './RecipeReview'

class RecipeFlow extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch, newRecipeStatus } = this.props;
    }

    componentWillRecieveProps(nextProps) {
        if(nextProps.newRecipeStatus !== this.props.newRecipeStatus) {
            const { dispatch, newRecipeStatus } = nextProps;
        }
    }

    render () {

        var slide = null;
        switch(this.props.newRecipeStatus) {
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
    newRecipeStatus: PropTypes.number.isRequired
}

function mapStateToProps(state) {
    const newRecipeStatus = state.filter.newRecipeStatus;

    return {
        newRecipeStatus
    }
}


export default connect(
mapStateToProps)(RecipeFlow);
