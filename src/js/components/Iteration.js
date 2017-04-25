import React from 'react';
import Plot from './Plot';
import Formula from './Formula';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';

import truncateCoefs from '../helpers/truncateCoefs';


export default class Iteration extends React.Component {
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
                                    <TableRowColumn>{this.props.data.max_err.toFixed(7)}</TableRowColumn>
                                </TableRow>
                                <TableRow>
                                    <TableRowColumn>Значення <i>x</i> в якому досягається максимальна похибка &nbsp;</TableRowColumn>
                                    <TableRowColumn>{this.props.data.x_of_max_err.toFixed(7)}</TableRowColumn>
                                </TableRow>
                                <TableRow>
                                    <TableRowColumn>{this.props.isLast ? 'Алгоритм закінчено бо ' : 'Продовжуємо алгоритм бо '}</TableRowColumn>
                                    <TableRowColumn>{this.props.data.err_diff.toFixed(7)} {this.props.isLast ? '<' : '>'} {this.props.precision}</TableRowColumn>
                                </TableRow>
                                <TableRow>
                                    <TableRowColumn>Аналітичний вигляд многочлена</TableRowColumn>
                                    <TableRowColumn><Formula formula={this.props.data.polynom_latex.replace(truncateCoefs(4), '$1')}/></TableRowColumn>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <Plot
                            id={this.props.ctn+1}
                            plotData={[{x: this.props.data.error_plot[0], y: this.props.data.error_plot[1]}]}
                        />
                    </CardText>
                </Card>
                {
                    this.props.isLast &&
                    <Card>
   
                        <Plot
                            id={this.props.ctn+1 + 'polynom'}
                            title={'Функція і наближення многочленом'}
                            plotData={[
                                {x: this.props.data.pol_plot[0], y: this.props.data.pol_plot[1], name: "f(x)"},
                                {x: this.props.data.func_plot[0], y: this.props.data.func_plot[1], name: "p(x)"}
                            ]}
                        />
                    </Card>
                }
            </div>
        );
    }
}

