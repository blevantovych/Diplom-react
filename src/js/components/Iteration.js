import React from 'react';
import Plot from './Plot';

export default class Iteration extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{border: '1px dashed gray', marginBottom: '10px'}}>
                <h4 style={{color: 'green'}}>Ітерація {this.props.ctn+1}</h4>
                <p>{this.props.data.alternance.map(el => el.toFixed(3)).join(' ')}</p>
                <h4>Максимальна похибка
                    <b>{this.props.data.max_err.toFixed(5)}</b>
                </h4>
                <h4>Значення <i>x</i> в якому досягається максимальна похибка &nbsp;
                    <b>{this.props.data.x_of_max_err.toFixed(5)}</b></h4>
                <Plot id={this.props.ctn+1}/>
            </div>
        );
    }
}

