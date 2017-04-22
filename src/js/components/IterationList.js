import React from 'react';
import Iteration from './Iteration';

// import data from '../data/mock';
import toArr from '../helpers/toArr';

export default class IterationList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        fetch('http://localhost:5000/minmaxGET?func=E^x&start=-1&end=4&deg=2')
            .then(r => r.json())
            .then(r => {
                this.setState(r);
            })
    }
    

    render() {
        const arr = toArr(this.state);
        const iters = arr.map((el, i) => <Iteration key={i} ctn={i} data={el} />)
        return (
            <div className="container">
                {iters}
            </div>
        );
    }
}

