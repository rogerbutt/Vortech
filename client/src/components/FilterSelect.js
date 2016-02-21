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
        const { dispatch } = this.props;
    }

    render() {
        const emails = this.props.emails;

        return (
                <div className="filter-select">
                    <h2>Select Emails</h2>
                    <p>Select a few emails to smartly create a filter.</p>
                    <div className="select-email-list">
                        <EmailList emails={emails} onEmailClick={(id) => this.props.handleClicks(id)} />
                    </div>
                    <button onClick={() => this.props.dispatch(finishEmailSelection())}>Finish</button>
                </div>
               );
    }

}

FilterSelect.propTypes = {
    emails: PropTypes.array.isRequired,
    handleClicks: PropTypes.func.isRequired,    
}


export default connect()(FilterSelect)
