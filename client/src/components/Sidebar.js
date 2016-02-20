import React, { Component, PropTypes } from 'react';
import { pushState } from 'redux-router';
import { connect } from 'react-redux';

class Sidebar extends Component {

    constructor(props) {
        super(props);

        this.navInbox = this.navInbox.bind(this);
        this.navFilters = this.navFilters.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        console.log(this.props);
    }

    navInbox() {
        this.props.dispatch(pushState(null, 'inbox'));
    }

    navFilters() {
        this.props.dispatch(pushState(null, 'filters'));
    }

    render() {
        return (
                <div className="sidebar">
                    <ul>
                        <li onClick={this.navInbox}>
                            Inbox
                        </li>
                        <li onClick={this.navFilters}>
                            Filters
                        </li>
                    </ul>
                </div>
                )
    }

}

Sidebar.propTypes = {
};

function mapStateToProps(state) {
    return {};
}

export default connect(
mapStateToProps)(Sidebar);
