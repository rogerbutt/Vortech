import React, { Component, PropTypes } from 'react';


const RecipeAction = ({ title, description, onClickAction }) => (
                <div className="recipe-action" onClick={() => onClickAction()}>
                    <h3>{ title }</h3>
                    <p>{ description }</p>
                </div>
               );

export default RecipeAction
