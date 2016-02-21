import React, { PropTypes } from 'react';
import { selectEmail } from '../actions/email';
import { connect } from 'react-redux';


const EmailHeader = ({ dispatch }) => (
            <div className="email-header">
                <p>Account <i className="fa fa-chevron-down"></i></p>                
                <button onClick={() => dispatch(selectEmail(-1))}>Dashboard</button>
            </div>
        )

export default connect()(EmailHeader)
