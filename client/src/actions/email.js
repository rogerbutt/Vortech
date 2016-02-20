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
    
    dispatch(requestEmails());

    return fetch('/email')
        .then((res) => {
            const data = JSON.parse(res.text);
            dispatch(requestEmailSuccess(data));
        })
        .catch((err) => {
        });

}

export const sendEmail = (subject, body) => {
    fetch('/send', {
        method: 'post',
        body
    })
}
