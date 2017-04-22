import React from 'react';
import Iteration from './Iteration';
import data from '../data/mock';
import toArr from '../helpers/toArr';

export default class IterationList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const arr = toArr(data);
        const iters = arr.map((el, i) => <Iteration key={i} ctn={i} data={el} />)
        return (
            <div className="container">
                {iters}
            </div>
        );
    }
}

