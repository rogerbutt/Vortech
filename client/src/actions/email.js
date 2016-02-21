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
            .then((res) => {
                const data = JSON.parse(res.text);
                dispatch(requestEmailSuccess(data.emails));
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

export const sendEmail = (subject, body) => {
    fetch('/send', {
        method: 'post',
        body
    })
}
