import React, { Component } from 'react';

class Plot extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        Plotly.newPlot('plot' + this.props.id, [{
            x: [1, 2, 3, 4],
            y: [-1, 2, 3, 4]
        }])
    }

    render() {
        return (
            <div id={'plot' + this.props.id}></div>
        );
    }
}

export default Plot;