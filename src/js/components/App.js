import React from 'react';
import IterationList from './IterationList';
import Loader from './loader';
import toArr from '../helpers/toArr';
import './main.scss';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaderActive: true
        }
    }
    
    componentDidMount() {
        
        fetch('http://localhost:5000/minmaxGET?func=E^x&start=-1&end=4&deg=4')
            .then(r => r.json())
            .then(r => {
                this.setState(Object.assign({}, {data: r}, {loaderActive: false}));
            })
    }
    

    render() {
        const arr = toArr(this.state.data);

        return (
            <div>
                <Loader active={this.state.loaderActive}/>
                <IterationList arr={arr}/>
            </div>
        );
    }
}

