import React, { Component } from 'react';

class Plot extends Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps, prevState) {
        Plotly.newPlot('plot' + this.props.id, [{
            x: this.props.x,
            y: this.props.y
        }])
    }

    componentDidMount() {
        Plotly.newPlot('plot' + this.props.id, [{
            x: this.props.x,
            y: this.props.y
        }])
    }

    render() {

        return (
            <div id={'plot' + this.props.id}></div>
        );
    }
}

export default Plot;