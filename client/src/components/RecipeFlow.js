import React, { Component, PropTypes } from 'react';
import FilterSelect from './FilterSelect'
import FilterList from './FilterList';
import RecipeReview from './RecipeReview'
import RecipeActionList from './RecipeActionList';
import { connect } from 'react-redux';
import { startNewRecipe, createNewRecipe, incrementFlow } from '../actions/filter';

class RecipeFlow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ids: [],
            action: -1
        }

        this.handleEmailSelect = this.handleEmailSelect.bind(this);
        this.makeNewRecipe = this.makeNewRecipe.bind(this);
        this.handleFinish = this.handleFinish.bind(this);
        this.addAction = this.addAction.bind(this);
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

    addAction(id) {
       this.setState({
           action: id
       });
       this.props.dispatch(incrementFlow());
    }

    makeNewRecipe() {
        this.props.dispatch(startNewRecipe());
    }

    handleFinish(name) {
        console.log('what');
        this.props.dispatch(createNewRecipe(name, this.state.ids, this.state.action));
    }

    render () {

        var slide = null;
        const filters = this.props.filters;
        
        switch(this.props.newFilterStatus) {
            case -1:
                slide = <FilterList filters={filters} makeNewRecipe={() => this.makeNewRecipe()} />;
                break;

            case 0:
                slide = <FilterSelect emails={this.props.emails} handleClicks={(id) => this.handleEmailSelect(id)} />;
                break;

            case 1:
                slide = <RecipeActionList actions={this.props.actions} selectAction={(id) => this.addAction(id)} />
                break;

            case 2:
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
    actions: PropTypes.object
}

function mapStateToProps(state) {
    const newFilterStatus = state.filter.newFilterStatus;
    const filters = state.filter.filters;
    console.log(filters);
    const emails = state.email.emails;
    const actions = state.filter.actions

    return {
        newFilterStatus,
        filters,
        emails,
        actions,
    }
}


export default connect(
mapStateToProps)(RecipeFlow);
