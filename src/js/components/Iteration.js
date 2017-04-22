import React from 'react';

export default class Iteration extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h4 style={{color: 'green'}}>Iteration {this.props.ctn}</h4>
                <p>{this.props.data.alternance.map(el => el.toFixed(3)).join(' ')}</p>
                <h4>Значення <i>x</i> в якому досягається максимальна похибка</h4>
            </div>
        );
    }
}

