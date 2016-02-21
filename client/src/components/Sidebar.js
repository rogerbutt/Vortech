import React, { Component, PropTypes } from 'react';
import { pushState } from 'redux-router';
import { connect } from 'react-redux';
import FilterOptions from './FilterOptions';

class Sidebar extends Component {

    constructor(props) {
        super(props);

        this.navInbox = this.navInbox.bind(this);
        this.navFilters = this.navFilters.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;
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
                    <div className="title">
                        <h2>Vor.tech</h2>
                    </div>
                    <ul>
                        <li onClick={this.navInbox}>
                          Inbox
                        </li>
                        <li className="subitem">
                          Sent Mail
                        </li>
                        <li className="subitem">
                          Archive
                        </li>
                        <li className="subitem">
                          Trash
                        </li>
                        <li className="subitem">
                          Spam
                        </li>

                        <li onClick={this.navFilters}>
                          Filters
                        </li>
                        <FilterOptions />
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
