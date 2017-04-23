import React, { Component } from 'react';
import toArr from '../helpers/toArr';
import Form from './Form';

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
            minmax: 0
        }
        this.getMaxErrs = this.getMaxErrs.bind(this);
    }

    getMaxErrs(func, start, end, deg) {
  
        console.log('getting max errs');
        const lssq = () => fetch('https://least-squares.herokuapp.com/least_squares', {
            method: 'POST',
            body: `${func}|${deg}|${start}|${end}|10|4`
        }).then(res => res.json())

        const minmax = () => fetch(`https://min-max.herokuapp.com/minmaxGET?func=${func}&start=${start}&end=${end}&deg=${deg}`).then(res => res.json())

        Promise.all([lssq(), minmax()]).then(data => {
            console.log(data)
            this.setState({
                lssq: data[0].max_error.toFixed(4),
                minmax: toArr(data[1]).last().max_err.toFixed(4)
            })
        })
    }

    render() {
        return (
            <div>
                <Form onCalcClick={this.getMaxErrs}/>
                <table>
                    <tr>
                        <td></td><td>Мінімакс</td><td>МНК</td>
                    </tr>
                    <tr>
                        <td>Макс похибка</td><td>{this.state.minmax}</td><td>{this.state.lssq}</td>
                    </tr>
                </table>
            </div>
        );
    }
}

export default Comparison;