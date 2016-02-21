import { REQUEST_EMAIL, REQUEST_EMAILS_SUCCESS, SELECT_EMAIL } from '../constants/EmailConstants'

const initialState = {
    isFetching: false,
    selectedEmail: -1,
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

        case REQUEST_EMAILS_SUCCESS: 
            console.log(action.payload.emails);
            return Object.assign({}, state, {
                isFetching: false,
                emails: action.payload.emails
            });

        case SELECT_EMAIL:
            console.log(action.payload);
            return Object.assign({}, state, {
                selectedEmail: action.payload.selectedEmail
            });

        default:
            return state;
        
    }
}
