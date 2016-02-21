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

export const newRecipeSuccess = (action, name) => {
    return {
        type: NEW_RECIPE_SUCCESS,
        payload: {
            action,
            name
        }
    }
}

export const createNewRecipe = (name, newRecipe, action) => {

    return function(dispatch) {

        dispatch(sendNewRecipe(name));

        return fetch('http://localhost:5000/api/v1/recipes/', {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ids: newRecipe,
                action: action,
                name: name
            })
        })
        .then(res => {
            dispatch(newRecipeSuccess(action, name));
        }).catch(err => {
            dispatch(newRecipeSuccess(action, name));
        });
    }
}

export const updateFilter = (receipts, id) => {
    console.log(receipts);
    return {
        type: 'UPDATE_FILTER',
        payload: {
            receipts,
            id
        }
    }
}

export const getPlotInfo = (filter) => {
    console.log(filter);
    return function (dispatch) {
        return fetch('http://localhost:5000/api/v1/actions/?action=2&filter='+filter.title)
            .then(res => res.json())
            .then(json => dispatch(updateFilter(json.receipts, filter.id)))
            .catch(err => console.log(err))
    }
}

export const getFiltersSuccess = (filters) => {
    return {
        type: 'GET_FILTERS_SUCCESS',
        payload: {
            filters
        }
    }
}

export const fetchFilters = () => {
    return function(dispatch) {
        return fetch('http://localhost:5000/api/v1/filters/')
            .then((res) => res.json())
            .then(json => {
                var id = 0;
                const filters = json.filters.map(f => {
                    let ff = f;
                    ff.id = id;
                    ff.title = f.name;
                    dispatch(getPlotInfo(ff));
                    return Object.assign({}, f, {title: f.name, id:id++ });
                });
                dispatch(getFiltersSuccess(filters));
            });
    }
}
