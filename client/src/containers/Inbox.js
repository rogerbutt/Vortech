import React, { PropTypes, Component } from 'react';
import EmailList from '../components/EmailList';
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

        return (
                <div>
                    <h1>Vortex Email</h1>
                    <EmailList emails={emails} onEmailClick={() => 0} />
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
