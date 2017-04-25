import React, { Component } from 'react';
import toArr from '../helpers/toArr';
import Form from './Form';

import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';
import { Card, CardText } from 'material-ui/Card';
import Loader from './loader';

if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
};

class Comparison extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lssq: 0,
            minmax: 0,
            loaderActive: false
        }
        this.getMaxErrs = this.getMaxErrs.bind(this);
    }

    getMaxErrs(func, start, end, deg, precision) {
        this.setState({loaderActive: true});
        console.log('getting max errs');
        const lssq = () => fetch('https://least-squares.herokuapp.com/least_squares', {
            method: 'POST',
            body: `${func}|${deg}|${start}|${end}|10|4`
        }).then(res => res.json())

        const minmax = () => fetch(`https://min-max.herokuapp.com/minmaxGET?func=${func}&start=${start}&end=${end}&deg=${deg}&precision=${precision}`)
                                .then(res => res.json())

        Promise.all([lssq(), minmax()]).then(data => {
            console.log(data)
            this.setState({
                lssq: data[0].max_error.toFixed(4),
                minmax: toArr(data[1]).last().max_err.toFixed(4), 
                loaderActive: false
            })
        })
    }

    render() {
        return (
            <div>
                <Form onCalcClick={this.getMaxErrs}/>
                <Loader active={this.state.loaderActive}/>
                <Card>
                    <CardText>
                        <Table>
                            <TableBody displayRowCheckbox={false}>
                                <TableRow>
                                    <TableRowColumn></TableRowColumn>
                                    <TableRowColumn>Мінімакс</TableRowColumn>
                                    <TableRowColumn>МНК</TableRowColumn>
                                </TableRow>
                                <TableRow>
                                    <TableRowColumn>Макс похибка</TableRowColumn>
                                    <TableRowColumn>{this.state.minmax}</TableRowColumn>
                                    <TableRowColumn>{this.state.lssq}</TableRowColumn>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardText>
                </Card>
            </div>
        );
    }
}

export default Comparison;