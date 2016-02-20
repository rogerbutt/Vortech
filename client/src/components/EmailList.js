import React, { PropTypes } from 'react';
import EmailItem from './EmailItem';

const EmailList = ({ emails, onEmailClick }) => (
            <ul>
                {emails.map(email =>
                        <EmailItem
                            key={email.id}
                            {...email}
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
        date: PropTypes.object.isRequired,
        body: PropTypes.string
    }).isRequired).isRequired,
    onEmailClick: PropTypes.func.isRequired
}

export default EmailList
