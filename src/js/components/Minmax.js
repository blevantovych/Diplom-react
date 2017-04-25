import React, { Component } from 'react';

import IterationList from './IterationList';
import Loader from './loader';
import Form from './Form';


class Minmax extends Component {
    render() {
        return (
            <div>
                <Form onCalcClick={this.props.clickCalcHandler}/>
                <Loader active={this.props.loaderActive}/>
                <IterationList arr={this.props.data} precision={this.props.precision}/>
            </div>
        );
    }
}

export default Minmax;