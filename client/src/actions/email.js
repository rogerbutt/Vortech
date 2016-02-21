import { REQUEST_EMAILS, REQUEST_EMAILS_SUCCESS, SELECT_EMAIL } from '../constants/EmailConstants';
import fetch from 'isomorphic-fetch';

export const requestEmails = () => {
    return {
        type: REQUEST_EMAILS
    }
}

export const selectEmail = (id) => {
    console.log(id);
    return {
        type: SELECT_EMAIL,
        payload: {
            selectedEmail: id
        }
    }
}

export const selectEmailFilter = (name) => {
    return function(dispatch) {
        return fetch("http://localhost:5000/api/v1/recipes/?recipe=" + name)
            .then((res) => res.json())
            .then(json => dispatch(requestEmailSuccess(json.emails))); 
    }
}

export const requestEmailSuccess = (emails) => {
    return {
        type: REQUEST_EMAILS_SUCCESS,
        payload: {
            emails,
        }
    }
}

export const fetchEmails = () => {

    return function (dispatch) {    
        dispatch(requestEmails());

        return fetch('http://localhost:5000/api/v1/mail/')
            .then((res) => res.json())
            .then(json => dispatch(requestEmailSuccess(json.emails)))
    }
}

export const sendEmail = (subject, body) => {
    fetch('/send', {
        method: 'post',
        body
    })
}
