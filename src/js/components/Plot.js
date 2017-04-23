import React, { Component } from 'react';

class Plot extends Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('did update');
        Plotly.newPlot('plot' + this.props.id, [{
            x: this.props.x,
            y: this.props.y
        }])
    }

    componentDidMount() {
        console.log('Plot did mount');
        Plotly.newPlot('plot' + this.props.id, [{
            x: this.props.x,
            y: this.props.y
        }])
        // console.log('Plot props: ', this.props);
    }

    render() {

        return (
            <div>
                <h1>{this.props.x.length}</h1>
                <div id={'plot' + this.props.id}></div>
            </div>
        );
    }
}

export default Plot;