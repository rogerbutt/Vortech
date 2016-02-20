import React, { Component, PropTypes } from 'react';

const EmailItem = ({ onClick, sender, subject, date }) => (
            <li
                onClick={onClick}
                >
                {sender} {subject} 
            </li>
        )

EmailItem.propTypes = {
    onClick: PropTypes.func.isRequired,
    sender: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    date: PropTypes.object.isRequired,
}

export default EmailItem
