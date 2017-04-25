import React, { Component } from 'react';
import toArr from '../helpers/toArr';
import Form from './Form';

import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';
import { Card, CardText } from 'material-ui/Card';
import Loader from './loader';
import Plot from './Plot';

if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
};

class Comparison extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lssq: {
                max_error: 0,
                x_of_max_error: 0
            },
            minmax: {
                max_err: 0,
                x_of_max_err: 0,
                func_plot: [],
                pol_plot: []
            },
            loaderActive: false
        }
    }

    getMaxErrs = (func, start, end, deg, precision) => {

        this.setState({loaderActive: true});
        console.log('getting max errs');
        const lssq = () => fetch('https://least-squares.herokuapp.com/least_squares', {
            method: 'POST',
            body: `${func}|${deg}|${start}|${end}|10|4`
        }).then(res => res.json())

        const minmax = () => fetch(`https://min-max.herokuapp.com/minmaxGET?func=${func}&start=${start}&end=${end}&deg=${deg}&precision=${precision}`)
                                .then(res => res.json())

        Promise.all([lssq(), minmax()]).then(data => {
            console.log(data);
            this.setState({
                lssq: data[0],
                minmax: toArr(data[1]).last(),
                loaderActive: false
            })
        })
    }

    render() {

        const lsPlot = <Plot id="comp_ls_plot" legend={false}
                            plotData={[
                                {x: this.state.lssq.x_approx, y: this.state.lssq.f_x_approx},
                                {x: this.state.lssq.x_approx, y: this.state.lssq.approximation}
                            ]}
                        />
        const mmPlot = <Plot id="comp_mm_plot" legend={false}
                            plotData={[
                                {x: this.state.minmax.func_plot[0], y: this.state.minmax.func_plot[1]},
                                {x: this.state.minmax.pol_plot[0], y: this.state.minmax.pol_plot[1]}
                            ]}
                        />
        return (
            <div>
                <Form onCalcClick={this.getMaxErrs}/>
                <Loader active={this.state.loaderActive}/>
                <div style={{width: '90vw', position: "absolute", left: '-15vw'}}>
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
                                        <TableRowColumn>{this.state.minmax.max_err.toFixed(4)}</TableRowColumn>
                                        <TableRowColumn>{this.state.lssq.max_error.toFixed(4)}</TableRowColumn>
                                    </TableRow>
                                    <TableRow>
                                        <TableRowColumn width={'20%'}>x в якому макс похибка</TableRowColumn>
                                        <TableRowColumn>{this.state.minmax.x_of_max_err.toFixed(4)}</TableRowColumn>
                                        <TableRowColumn>{this.state.lssq.x_of_max_error.toFixed(4)}</TableRowColumn>
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