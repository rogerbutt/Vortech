import React, { Component, PropsTypes } from 'react';
import EmailList from './EmailList';

class FilterSelect extends Component {
    
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch, emails } = this.props;
    }

    render() {
        const emails = this.props.emails;

        return (
                <div>
                    <h2>Select Emails</h2>
                    <EmailList emails={emails} onEmailClick={(id) => dispatch(addEmailToNewFilter(id))} />
                    <button onClick={() => dispatch(finishFilterSelection())}>Finish</button>
                </div>
               );
    }

}
