import React, { Component, PureComponent } from 'react';
import toArr from '../helpers/toArr';
import Form from './Form';
import truncateCoefs from '../helpers/truncateCoefs';

import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';
import { Card, CardText } from 'material-ui/Card';
import Loader from './loader';
import Plot from './Plot';
import Formula from './Formula';

if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
};

class Comparison extends PureComponent {
    constructor(props) {
        super(props);
    }

    

    render() {

        const lsPlot = <Plot id="comp_ls_plot" legend={false}
                            plotData={[
                                {x: this.props.lssq.x_approx, y: this.props.lssq.f_x_approx},
                                {x: this.props.lssq.x_approx, y: this.props.lssq.approximation}
                            ]}
                        />
        const mmPlot = <Plot id="comp_mm_plot" legend={false}
                            plotData={[
                                {x: this.props.minmax.func_plot[0], y: this.props.minmax.func_plot[1]},
                                {x: this.props.minmax.pol_plot[0], y: this.props.minmax.pol_plot[1]}
                            ]}
                        />
        return (
            <div>
                <Form onCalcClick={this.props.clickCalcHandler} lssq={true} minmax={true} />
                <div style={{width: '90vw', position: "absolute", left: '-15vw', margin: '30px 0'}}>
                    <Card>
                        <CardText>
                            <Table>
                                <TableBody displayRowCheckbox={false}>
                                    <TableRow>
                                        <TableRowColumn width={'20%'}></TableRowColumn>
                                        <TableRowColumn>Мінімакс</TableRowColumn>
                                        <TableRowColumn>МНК</TableRowColumn>
                                    </TableRow>
                                    <TableRow>
                                        <TableRowColumn width={'20%'}>Макс похибка</TableRowColumn>
                                        <TableRowColumn>{this.props.minmax.max_err.toFixed(4)}</TableRowColumn>
                                        <TableRowColumn>{this.props.lssq.max_error.toFixed(4)}</TableRowColumn>
                                    </TableRow>
                                    <TableRow>
                                        <TableRowColumn width={'20%'}>x в якому макс похибка</TableRowColumn>
                                        <TableRowColumn>{this.props.minmax.x_of_max_err.toFixed(4)}</TableRowColumn>
                                        <TableRowColumn>{this.props.lssq.x_of_max_error.toFixed(4)}</TableRowColumn>
                                    </TableRow>
                                    <TableRow>
                                        <TableRowColumn width={'20%'}>Аналітичний вигляд</TableRowColumn>
                                        <TableRowColumn><Formula formula={this.props.minmax.polynom_latex.replace(truncateCoefs(4), '$1')}/></TableRowColumn>
                                        <TableRowColumn><Formula formula={this.props.lssq.formula.replace(truncateCoefs(4), '$1')}/></TableRowColumn>

                                    </TableRow>
                                    <TableRow>
                                        <TableRowColumn width={'20%'}>Графіки</TableRowColumn>
                                        <TableRowColumn>{mmPlot}</TableRowColumn>
                                        <TableRowColumn>{lsPlot}</TableRowColumn>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardText>
                    </Card>
                </div>
            </div>
        );
    }
}

export default Comparison;