import React, { Component, PropTypes } from 'react';
import EmailBody from '../components/EmailBody';
import { connect } from 'react-redux';

class ContentView extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch, selectedEmail } = this.props;
    }

    componentWillReceiveProps(nextProps) {
        console.log('next');
        if(nextProps.selectedEmail !== this.props.selectedEmail) {
            const { dispatch, selectedEmail } = this.props;
        }
    }

    render () {
        const { selectedEmail } = this.props;
        console.log('asdfasdf');
        console.log(selectedEmail);

        return (
                <div className="content-view">
                    { (selectedEmail !== -1) ? <EmailBody /> : <p>Hi</p> }
                </div>
               );
    }
}

ContentView.propTypes = {
    selectedEmail: PropTypes.number
}

function mapStateToProps(state) {
    const selectedEmail = state.email.selectedEmail;

    return {
        selectedEmail
    }
}

export default connect(
mapStateToProps)(ContentView);
