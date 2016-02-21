import React, { Component, PropTypes } from 'react';
import RecipeAction from './RecipeAction';


const RecipeActionList = ({ actions, selectAction }) => (
                <div className="action-list">
                    <h2> Actions </h2>
                    {actions.map(action => 
                        <RecipeAction
                            key={action.id}
                            title={action.title}
                            description={action.description}
                            onClickAction={() => selectAction(action.id)}
                            />
                            )
                    }
                </div>
               );

RecipeActionList.propTypes = {
    actions: PropTypes.array.isRequired,
    selectAction: PropTypes.func.isRequired,
}

export default RecipeActionList 
