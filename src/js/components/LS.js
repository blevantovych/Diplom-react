import React, { Component } from 'react'

import IterationList from './IterationList'
import Form from './Form'
import Plot from './Plot'
import Formula from './Formula'

import truncateCoefs from '../helpers/truncateCoefs'

import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table'
import { Card, CardText } from 'material-ui/Card'

class LS extends Component {
    render() {
        return (
            <div>
                <Form formData={this.props.formData} onCalcClick={this.props.clickCalcHandler} lssq={true} />
                
                {this.props.data &&
                    <Card>
                        <CardText>
                            <Table>
                                <TableBody displayRowCheckbox={false}>
                                    <TableRow>
                                        <TableRowColumn>Аналітичний вигляд многочлена</TableRowColumn>
                                        <TableRowColumn><Formula formula={this.props.data.formula.replace(truncateCoefs(4), '$1')}/></TableRowColumn>
                                    </TableRow>
                                    <TableRow>
                                        <TableRowColumn>Значення <i>x</i> в якому досягається максимальна похибка</TableRowColumn>
                                        <TableRowColumn>{this.props.data.x_of_max_error.toFixed(5)}</TableRowColumn>
                                    </TableRow>
                                    <TableRow>
                                        <TableRowColumn>Максимальна похибка</TableRowColumn>
                                        <TableRowColumn>{this.props.data.max_error.toFixed(5)}</TableRowColumn>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardText>

                        <Plot id="ls_plot"
                            plotData={[
                                {x: this.props.data.x_approx, y: this.props.data.f_x_approx, name: 'Функція'},
                                {x: this.props.data.x_approx, y: this.props.data.approximation, name: 'Апроксимація'},
                                {x: this.props.data.x_vals, y: this.props.data.y_vals, mode: 'markers', name: 'Точки (викор. в МНК)'},
                                {...this.props.data.max_error_line, name: 'Максимальна похибка'}
                            ]}
                        />
                         <Plot id="ls_error" title='Функція похибки'
                            plotData={[
                                {...this.props.data.error_plot}
                            ]}
                        />
                    </Card>
                }
            </div>
        )
    }
}

export default LS