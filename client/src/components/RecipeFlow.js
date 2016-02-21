import React, { Component, PropTypes } from 'react';
import FilterSelect from './FilterSelect'
import FilterList from './FilterList';
import RecipeReview from './RecipeReview'
import { connect } from 'react-redux';
import { startNewRecipe, createNewRecipe } from '../actions/filter';

class RecipeFlow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ids: []
        }

        this.handleEmailSelect = this.handleEmailSelect.bind(this);
        this.makeNewRecipe = this.makeNewRecipe.bind(this);
        this.handleFinish = this.handleFinish.bind(this);
    }

    componentDidMount() {
        const { dispatch, newFilterStatus, filters } = this.props;
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.newRecipeStatus !== this.props.newRecipeStatus) {
            const { dispatch, newFilterStatus, filters } = nextProps;
        }
    }

    handleEmailSelect(id) {
        var ids = this.state.ids || [];
        ids.push(id);
        this.setState({
            ids: ids
        });
    }

    makeNewRecipe() {
        this.props.dispatch(startNewRecipe());
    }

    handleFinish(name) {
        console.log('what');
        this.props.dispatch(createNewRecipe(name, this.state.ids));
    }

    render () {

        var slide = null;
        const filters = this.props.filters;
        
        switch(this.props.newFilterStatus) {
            case -1:
                slide = <FilterList filters={filters} />;
                break;

            case 0:
                slide = <FilterSelect emails={this.props.emails} handleClicks={(id) => this.handleEmailSelect(id)} />;
                break;

            case 1:
                slide = <RecipeReview onFinish={(name) => this.handleFinish(name)} />;
                break;

            default:
                slide = <FilterList filters={filters} />;
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
    emails: PropTypes.array.isRequired,
}

function mapStateToProps(state) {
    const newFilterStatus = state.filter.newFilterStatus;
    const filters = state.filter.filters;
    const emails = state.email.emails;

    return {
        newFilterStatus,
        filters,
        emails,
    }
}


export default connect(
mapStateToProps)(RecipeFlow);
