import React from 'react';
import Header from './Header';
import IterationList from './IterationList';
import Loader from './loader';
import Comparison from './Comparison';
import toArr from '../helpers/toArr';
import Form from './Form';
import './main.scss';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaderActive: false,
            data: []
        };
        this.clickCalcHandler = this.clickCalcHandler.bind(this);
        injectTapEventPlugin();
    }
    
    clickCalcHandler(func, start, end, deg, precision) {
        this.setState({loaderActive: true});
        fetch(`https://min-max.herokuapp.com/minmaxGET?func=${func}&start=${start}&end=${end}&deg=${deg}&precision=${precision}`)
            .then(r => r.json())
            .then(r => {
                this.setState({data: toArr(r), loaderActive: false, precision});
            })
    }

    render() {

        return (
            <MuiThemeProvider>
                <div class="container">
                    <Header />
                    <Form onCalcClick={this.clickCalcHandler}/>
                    <Loader active={this.state.loaderActive}/>
                    <IterationList arr={this.state.data} precision={this.state.precision}/>
                </div>
            </MuiThemeProvider>
        );
    }
}

