import { REQUEST_FILTERS, REQUEST_FILTERS_SUCCESS } from '../constants/FilterConstants'

const initialState = {
    isFetching: false,
    filters: [
        {
            id: 1,
            title: 'Flights'
        }
    ]
}

export default function filter(state = initialState, action) {
    switch (action.type) {
        case REQUEST_FILTERS:
            return Object.assign({}, state, {
                isFetching: true,
            });

        case REQUEST_FILTERS_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                filters: action.payload.filters
            });

        default:
            return state;
    }
}
