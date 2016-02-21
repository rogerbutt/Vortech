import React, { PropTypes, Component } from 'react';
import EmailList from '../components/EmailList';
import ContentView from './ContentView';
import { selectEmail, fetchEmails } from '../actions/email';
import { fetchFilters } from '../actions/filter';
import { connect } from 'react-redux';

class Inbox extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {
            dispatch,
            emails
        } = this.props;
        dispatch(fetchEmails());
        dispatch(fetchFilters());
    }

    componentWillReceiveProps(nextProps) {
        if(!nextProps)
            return;

        if(!this.props.emails || nextProps.emails.length !== this.props.emails.length) {
            const { dispatch, emails } = nextProps;
        }
    }

    render () {

        const emails = this.props.emails;
        const dispatch = this.props.dispatch;

        return (
                <div>
                    <div className="email-list">
                        <input type="text" placeholder="Search" />
                        <EmailList
                            emails={emails}
                            onEmailClick={(id) => dispatch(selectEmail(id))} />
                    </div>
                    <ContentView />
                </div>
               );

    }
}

Inbox.propTypes = {
    emails: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
    const emails = state.email.emails;

    return {
        emails,
    }
}

export default connect(
mapStateToProps)(Inbox);
