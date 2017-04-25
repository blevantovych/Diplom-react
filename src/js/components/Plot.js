import React, { Component } from 'react';
// import Plotly from 'plotly';

class Plot extends Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps, prevState) {
        Plotly.newPlot('plot' + this.props.id, this.props.plotData, {title: this.props.title});
    }

    componentDidMount() {
        Plotly.newPlot('plot' + this.props.id, this.props.plotData, {title: this.props.title});
    }

    render() {

        return (
            <div id={'plot' + this.props.id}></div>
        );
    }
}

export default Plot;