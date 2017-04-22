import React, { Component } from 'react';
// import Plotly from 'plotly';


class Plot extends Component {
    constructor(props) {
        super(props);
        // Plotly.newPlot('plot', {
        //     x: [1, 2, 3, 4],
        //     y: [-1, 2, 3, 4]
        // })
    }

    // shouldComponentUpdate() {
    //     return false;
    // }
    componentDidMount() {
        // console.log('componentDidMount');
        Plotly.newPlot('plot' + this.props.id, [{
            x: [1, 2, 3, 4],
            y: [-1, 2, 3, 4]
        }])
    }
    render() {
        return (
            <div id={'plot' + this.props.id}>
                
            </div>
        );
    }
}

export default Plot;