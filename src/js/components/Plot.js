import React, { Component } from 'react';
// import Plotly from 'plotly';

class Plot extends Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps, prevState) {
        Plotly.newPlot('plot' + this.props.id, this.props.plotData);
    }

    componentDidMount() {
        Plotly.newPlot('plot' + this.props.id, this.props.plotData);
    }

    render() {

        return (
            <div id={'plot' + this.props.id}></div>
        );
    }
}

export default Plot;