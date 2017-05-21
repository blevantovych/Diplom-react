import React from 'react';
import Plot from './Plot';
import Formula from './Formula';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';

import truncateCoefs from '../helpers/truncateCoefs';

export default class IterationMinmaxDiscrete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        };
    }

    handleExpandChange = (expanded) => {
        console.log('handleExpandChange');
        this.setState({expanded: expanded});
    };

    render() {

        const alt = this.props.data.alternance.map((el, i) => {
            return <TableRowColumn key={i}>{el.toFixed(7)}</TableRowColumn>
        })
        alt.unshift(<TableRowColumn><h4>Точка альтернансу</h4></TableRowColumn>)

        const err_alt = this.props.data.err_in_each_point.map((el, i) => {
            return <TableRowColumn key={i}>{el.toFixed(7)}</TableRowColumn>
        })
        err_alt.unshift(<TableRowColumn><h4>Похибка</h4></TableRowColumn>)

        return (
            <div>
                <Card style={{margin: '20px 0'}} expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
                    <CardHeader
                        title={'Ітерація ' + (this.props.ctn+1)}
                        actAsExpander={true}
                        showExpandableButton={true}
                    />

                    <CardText expandable={true}>
                        <Table>
                            <TableBody displayRowCheckbox={false}>
                                <TableRow>
                                    {alt}
                                </TableRow>
                                <TableRow>
                                    {err_alt}
                                </TableRow>
                            </TableBody>
                        </Table>
                        <br />

                        <Table>
                            <TableBody displayRowCheckbox={false}>
                                <TableRow >
                                    <TableRowColumn>Максимальна похибка</TableRowColumn>
                                    <TableRowColumn>{this.props.data.max_error.toFixed(7)}</TableRowColumn>
                                </TableRow>
                                <TableRow>
                                    <TableRowColumn>Значення <i>x</i> в якому досягається максимальна похибка &nbsp;</TableRowColumn>
                                    <TableRowColumn>{this.props.data.x_error.toFixed(7)}</TableRowColumn>
                                </TableRow>

                                <TableRow>
                                    <TableRowColumn>Аналітичний вигляд многочлена</TableRowColumn>
                                    <TableRowColumn><Formula formula={this.props.data.formula.replace(truncateCoefs(4), '$1')}/></TableRowColumn>
                                </TableRow>
                                {/*<TableRow>
                                    <TableRowColumn>For desmos</TableRowColumn>
                                    <TableRowColumn>{this.props.data.polynom_latex.replace(truncateCoefs(4), '$1')}</TableRowColumn>
                                </TableRow>*/}
                            </TableBody>
                        </Table>
                        <Plot id={"minmax_discrete_plot"+this.props.ctn}
                            plotData={[
                                //{x: this.props.data.x_approx, y: this.props.data.f_x_approx, name: 'Функція'},
                                {x: this.props.data.x_approx, y: this.props.data.approximation, name: 'Апроксимація'},
                                {x: this.props.data.x_vals, y: this.props.data.y_vals, mode: 'markers', name: 'Табл. дані'},
                                {x: this.props.data.alternance, y: this.props.data.f_alternance, mode: 'markers', name: 'Точки альтернансу'},
                                {...this.props.data.max_error_line, name: 'Максимальна похибка'}
                            ]}
                        />
                    </CardText>
                </Card>
            </div>
        );
    }
}

