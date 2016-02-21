import React, { PropTypes } from 'react';

const EmailItem = ({ onClick, sender, subject }) => (
            <li
                onClick={onClick}
                className="email-item"
                >
                {sender} {subject} 
            </li>
        )

EmailItem.propTypes = {
    onClick: PropTypes.func.isRequired,
    sender: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
}

export default EmailItem
