import React, { Component } from 'react';

import FormDiscrete from './FormDiscrete';
import Plot from './Plot';

import truncateCoefs from '../helpers/truncateCoefs';
import Formula from './Formula';

import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';
import { Card, CardText } from 'material-ui/Card';
import IterationListDiscreteMinmax from './IterationListDiscreteMinmax';

class Minmax_Discrete extends Component {
    render() {
        return (
            <div>
                <FormDiscrete formData={this.props.formData} onCalcClick={this.props.clickCalcHandler} />
                <IterationListDiscreteMinmax arr={this.props.data} />
            </div>
        );
    }
}

export default Minmax_Discrete;