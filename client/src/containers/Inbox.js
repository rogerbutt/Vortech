import React, { PropTypes, Component } from 'react';
import EmailList from '../components/EmailList';
import ContentView from './ContentView';
import { selectEmail } from '../actions/email';
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
    }

    render () {

        const emails = this.props.emails;
        const dispatch = this.props.dispatch;

        return (
                <div>
                    <h1>Inbox</h1>
                    <EmailList emails={emails} onEmailClick={(id) => dispatch(selectEmail(id))} />
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
