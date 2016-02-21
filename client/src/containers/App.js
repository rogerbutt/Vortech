import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Sidebar from '../components/Sidebar';
import ContentView from '../containers/ContentView';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
                <div>
                    <Sidebar />
                    <div className="content">{this.props.children}</div>
                </div>
               );
    }
}

export default connect()(App)
