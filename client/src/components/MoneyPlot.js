import React, { Component, PropTypes } from 'react';
import Plotly from 'react-plotlyjs';
import { connect } from 'react-redux';

class MoneyPlot extends Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        console.log('derp');
        console.log(nextProps.filter.receipts);
        const { filter } = nextProps;

    }

    shouldComponentUpdate(next, cur) {
        return true;
    }

    render() {

        let data = [ {
            x: this.props.filter.receipts.map((r) => new Date(r.date)),
            y: this.props.filter.receipts.map((r) => parseInt(r.subtotal)),
            type: 'bar'
        } ];

        let layout = {                    
            title: this.props.filter.title,
            xaxis: {
                title: 'time',
            },
            showlegend: false,
        };

        let config = {
            displayModeBar: false,
        };

        return (
                <Plotly data={data} layout={layout} config={config} />
                );
    }
}

MoneyPlot.propTypes = {
    filter: PropTypes.object
}

export default MoneyPlot;
