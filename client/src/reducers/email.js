import { REQUEST_EMAIL, REQUEST_EMAIL_SUCCESS } from '../constants/EmailConstants'

const initialState = {
    isFetching: false,
    emails: [
            {
                id: 0,
                sender: 'a@a.com',
                subject: 'nigerian prince needs your help',
                date: new Date(),
                body: 'send $1000'
            },
        ],
}

export default function email(state = initialState, action) {
    switch (action.type) {
        case REQUEST_EMAIL:
            return Object.assign({}, state, {
                isFetching: true
            });

        case REQUEST_EMAIL_SUCCESS: 
            return Object.assign({}, state, {
                isFetching: false,
                emails: action.payload.emails
            });

        default:
            return state;
        
    }
}
