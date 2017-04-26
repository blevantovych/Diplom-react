import React, { Component } from 'react';

import IterationList from './IterationList';
import Form from './Form';


class Minmax extends Component {
    render() {
        return (
            <div>
                <Form onCalcClick={this.props.clickCalcHandler} minmax={true}/>
                <IterationList arr={this.props.data} precision={this.props.precision}/>
            </div>
        );
    }
}

export default Minmax;