import { REQUEST_FILTERS, REQUEST_FILTERS_SUCCESS, ADD_EMAIL_TO_NEW_FILTER, FINISH_EMAIL_SELECTION, POST_NEW_RECIPE, START_NEW_RECIPE, NEW_RECIPE_SUCCESS, ADD_ACTION_TO_RECIPE, INCREMENT_FLOW } from '../constants/FilterConstants';
import fetch from 'isomorphic-fetch';

export const requestFilters = () => {

    return {
        type: REQUEST_FILTERS
    }

}

export const requestFiltersSuccess = (filters) => {
    return {
        type: REQUEST_FILTERS_SUCCESS,
        payload: {
            filters
        }
    }
}

export const incrementFlow = () => {
    return {
        type: INCREMENT_FLOW
    }
}

export const startNewRecipe = () => {
    return {
        type: START_NEW_RECIPE
    }
}

export const addEmailToNewFilter = (id) => {
    return {
        type: ADD_EMAIL_TO_NEW_FILTER,
        payload: {
            id
        }
    }
}

export const finishEmailSelection = () => {
   return {
        type: FINISH_EMAIL_SELECTION
   }
}

export const addActionToRecipe = (id) => {
   return {
        type: ADD_ACTION_TO_RECIPE
   }
}

export const sendNewRecipe = (name) => {
    return {
        type: POST_NEW_RECIPE,
        payload: {
            name
        }
    }
}

export const newRecipeSuccess = () => {
    return {
        type: NEW_RECIPE_SUCCESS
    }
}

export const createNewRecipe = (name, newRecipe) => {

    return function(dispatch) {

        dispatch(sendNewRecipe(name));

        return fetch('http://localhost:5000/api/v1/recipes/', {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'COntent-Type': 'application/json'
            },
            body: JSON.stringify({
                ids: newRecipe,
                name: name
            })
        })
        .then(res => {
            dispatch(newRecipeSuccess());            
        });
    }
}

export const fetchFilters = () => {

    dispatch(requestFilters());

    return fetch('/filter')
        .then((res) => {
            const data = JSON.parse(res.text);
            dispatch(requestFiltersSuccess(data));
        })

}
