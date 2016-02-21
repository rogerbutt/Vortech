import React, { Component, PropTypes } from 'react';

class EmailItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({
            active: !this.state.active
        });
        this.props.onClick();
    }

    render() {
        return (
            <li
                onClick={this.handleClick}
                className={(!this.state.active) ? "email-item" : "active email-item"}
                >
                <h4>{this.props.sender}</h4>
                <p>{this.props.subject}</p> 
            </li>
        );
    }
}

EmailItem.propTypes = {
    onClick: PropTypes.func.isRequired,
    sender: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
}

export default EmailItem
