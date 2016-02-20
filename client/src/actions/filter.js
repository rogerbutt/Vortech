import { REQUEST_FILTERS, REQUEST_FILTERS_SUCCESS } = 'REQUEST_FILTERS_SUCCESS';
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

export const fetchFilters = () => {
    
    dispatch(requestFilters());

    return fetch('/filter')
        .then((res) => {
            const data = JSON.parse(res.text);
            dispatch(requestFiltersSuccess(data));
        })

}
