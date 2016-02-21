import React, { PropTypes, Component } from 'react';
import RecipeFlow from '../components/RecipeFlow';
import { startNewRecipe } from '../actions/filter';
import { connect } from 'react-redux';

class Filters extends Component {

    constructor(props) {
        super(props);
        this.makeNewRecipe = this.makeNewRecipe.bind(this);
    }

    componentDidMount() {
        const {
            dispatch,
            filters
        } = this.props;
    }

    makeNewRecipe() {
        this.props.dispatch(startNewRecipe());
    }

    render () {
    
        const filters = this.props.filters;
        var content = null;

        return (
                    <div>
                        <div>
                            <h1>Recipes</h1>
                            <button onClick={this.makeNewRecipe}>Make New Recipe</button>
                        </div>
                        <RecipeFlow />
                    </div>
               );

    }

}

Filters.propTypes = {
};

function mapStateProps(state) {

    return {
    }
}

export default connect(
mapStateProps)(Filters)
