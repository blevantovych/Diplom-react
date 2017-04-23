import React from 'react';
import Plot from './Plot';
import Formula from './Formula';

import truncateCoefs from '../helpers/truncateCoefs';

export default class Iteration extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const alt = this.props.data.alternance.map((el, i) => {
            return <td key={i}>{el.toFixed(7)}</td>
        })
        alt.unshift(<td>Точка альтернансу</td>)

        const err_alt = this.props.data.err_in_each_point.map((el, i) => {
            return <td key={i}>{el.toFixed(7)}</td>
        })
        err_alt.unshift(<td>Похибка</td>)

        return (
            <div style={{border: '1px dashed gray', marginBottom: '10px', padding: '10px'}}>
                
                <h4 style={{color: 'green'}}>Ітерація {this.props.ctn+1}</h4>
                <table className="table table-bordered">
                    <tbody>
                        <tr>{alt}</tr>
                        <tr>{err_alt}</tr>
                    </tbody>
                </table>
                <h4>Максимальна похибка
                    <b>{this.props.data.max_err.toFixed(7)}</b>
                </h4>
                <h4>Значення <i>x</i> в якому досягається максимальна похибка &nbsp;
                    <b>{this.props.data.x_of_max_err.toFixed(7)}</b></h4>

                <h4>Продовжуємо алгоритм бо &nbsp;
                    <b>{this.props.data.err_diff.toFixed(7)} > 0.01</b></h4>

                <h4>Аналітичний вигляд многочлена:
                    <Formula formula={this.props.data.polynom_latex.replace(truncateCoefs(4), '$1')}/>
                </h4>
                <Plot
                    id={this.props.ctn+1}
                    x={this.props.data.error_plot[0]}
                    y={this.props.data.error_plot[1]}
                />
                {this.props.isLast && <Plot
                    id={this.props.ctn+1 + 'polynom'}
                    x={this.props.data.pol_plot[0]}
                    y={this.props.data.pol_plot[1]}
                />}
            </div>
        );
    }
}

