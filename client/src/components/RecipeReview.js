import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class RecipeReview extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            name: ""
        }
        this.handleName = this.handleName.bind(this);
        this.handleFinish = this.handleFinish.bind(this);
    }

    handleName (evt) {
        this.setState({
            name: evt.target.value
        });
    }

    handleFinish () {
        console.log('finish');
        this.props.onFinish(this.state.name);
    }

    render () {
        return (
                    <div className="recipe-review">
                        <h2>Review Your Recipe</h2>
                        <p>Name the awesome recipe you have created</p>
                        <h4>Name:</h4>
                        <input type="text" onChange={this.handleName}/>
                        <button onClick={() => this.props.onFinish(this.state.name)}>Finish</button>
                    </div>
               );
    }

}

RecipeReview.propTypes = {
    onFinish: PropTypes.func.isRequired,
    actions: PropTypes.string,
}


export default RecipeReview
