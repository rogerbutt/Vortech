import React, { Component, PropTypes } from 'react';
import EmailList from './EmailList';
import { connect } from 'react-redux';
import { fetchEmails } from '../actions/email';
import { addEmailToNewFilter, finishEmailSelection } from '../actions/filter';

class FilterSelect extends Component {
    
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch, emails } = this.props;
        this.props.dispatch(fetchEmails());
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.emails.length > this.props.emails.length) {
            const { dispatch, emails } = nextProps;
        }
    }

    render() {
        const emails = this.props.emails;

        return (
                <div>
                    <h2>Select Emails</h2>
                    <EmailList emails={emails} onEmailClick={(id) => this.props.dispatch(addEmailToNewFilter(id))} />
                    <button onClick={() => this.props.dispatch(finishFilterSelection())}>Finish</button>
                </div>
               );
    }

}

FilterSelect.propTypes = {
    emails: PropTypes.array.isRequired,
}

function mapStateToProps(state) {
    const emails = state.email.emails;

    return {
        emails
    }
}

export default connect(
mapStateToProps)(FilterSelect)
