import { REQUEST_FILTERS, REQUEST_FILTERS_SUCCESS, ADD_EMAIL_TO_NEW_FILTER, FINISH_EMAIL_SELECTION, POST_NEW_RECIPE, START_NEW_RECIPE } from '../constants/FilterConstants';
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
   console.log('how');
   return {
        type: FINISH_EMAIL_SELECTION
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

export const createNewRecipe = (name, newRecipe) => {

    return function(dispatch) {

        dispatch(sendNewRecipe(name));

        return fetch('http://localhost:5000/api/v1/recipes/', {
            method: 'post',
            newRecipe: {
                ids: newRecipe,
                name: name
            }
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
