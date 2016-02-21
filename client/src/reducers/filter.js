import { REQUEST_FILTERS, REQUEST_FILTERS_SUCCESS, ADD_EMAIL_TO_NEW_FILTER, FINISH_EMAIL_SELECTION, START_NEW_RECIPE } from '../constants/FilterConstants'

const initialState = {
    isFetching: false,
    newFilter: {
        ids: null,
        name: null,
    },
    newFilterStatus: -1,
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

        case START_NEW_RECIPE:
            return Object.assign({}, state, {
                newFilterStatus: 0
            });

        case ADD_EMAIL_TO_NEW_FILTER:
            var ids = [] || state.newFilterIds;
            ids.push(action.payload.id);

            return Object.assign({}, state, {
                newFilteri: {
                    ids: ids,
                }
            });

        case FINISH_EMAIL_SELECTION:
            return Object.assign({}, state, {
                newFilterStatus: 1
            });

        default:
            return state;
    }
}
