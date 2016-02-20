import { REQUEST_FILTERS, REQUEST_FILTERS_SUCCESS, ADD_EMAIL_TO_NEW_FILTER, FINISH_EMAIL_SELECTION } from '../constants/FilterConstants'

const initialState = {
    isFetching: false,
    newFilterIds: null,
    newFilterStatus: 0,
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

        case ADD_EMAIL_TO_NEW_FILTER:
            var ids = [] || state.newFilterIds;
            ids.push(action.payload.id);

            return Object.assign({}, state, {
                newFilterIds: ids
            });

        case FINISH_EMAIL_SELECTION:
            return Object.assign({}, state, {
                newFilterStatus: 1
            });

        default:
            return state;
    }
}
