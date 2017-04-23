import React from 'react';
import Iteration from './Iteration';

// import data from '../data/mock';

export default class IterationList extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        const iters = this.props.arr.map((el, i) => <Iteration key={i} ctn={i} data={el} />)
        return (
            <div>
                {iters}
            </div>
        );
    }
}

