import React from 'react';
import Iteration from './Iteration'

import data from '../data/mock'

function toArr(obj) {
    let arr = [];
    for (let i in obj) {
        arr.push(obj[i])
    }
    return arr;
}

console.log(data);
const arr = toArr(data);


export default class IterationList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const iters = arr.map((el, i) => <Iteration key={i} ctn={i} data={el} />)
        return (
            <div className="container">
                {iters}
            </div>
        );
    }
}

