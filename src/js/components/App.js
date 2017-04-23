import React from 'react';
import IterationList from './IterationList';
import Loader from './loader';
import toArr from '../helpers/toArr';
import Form from './Form';
import './main.scss';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaderActive: false
        };
        this.clickCalcHandler = this.clickCalcHandler.bind(this);
    }
    
    clickCalcHandler(func, start, end, deg) {
        console.log('fetching');
        // fetch(`http://localhost:5000/minmaxGET?func=E^x&start=-1&end=4&deg=1`)
        fetch(`http://localhost:5000/minmaxGET?func=${func}&start=${start}&end=${end}&deg=${deg}`)
            .then(r => r.json())
            .then(r => {
                this.setState(Object.assign({}, {data: r}, {loaderActive: false}));
            })
    }

    render() {
        const arr = toArr(this.state.data);

        return (
            <div class="container">
                <Form onCalcClick={this.clickCalcHandler}/>
                <Loader active={this.state.loaderActive}/>
                <IterationList arr={arr}/>
            </div>
        );
    }
}

