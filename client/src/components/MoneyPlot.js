import React, { Component, PropTypes } from 'react';
import Plotly from 'react-plotlyjs';
import { connect } from 'react-redux';

class MoneyPlot extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        let data = [ {
            x: [1, 2, 3, 4], 
            y: [10, 15, 13, 17], 
            type: 'scatter'
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
