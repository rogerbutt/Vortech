import React, { PropTypes } from 'react';
import EmailItem from './EmailItem';

const EmailList = ({ emails, onEmailClick }) => (
            <ul>
                {emails.map(email =>
                        <EmailItem
                            key={email.id}
                            subject={email.subject}
                            sender={email.sender}
                            onClick={() => onEmailClick(email.id)}
                            />
                        )}
            </ul>
        )

EmailList.propTypes = {
    emails: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        sender: PropTypes.string.isRequired,
        subject: PropTypes.string.isRequired,
        body: PropTypes.string
    }).isRequired).isRequired,
    onEmailClick: PropTypes.func.isRequired
}

export default EmailList
