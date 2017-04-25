import React from 'react';
import Header from './Header';
// import IterationList from './IterationList';
// import Loader from './loader';
import Comparison from './Comparison';
import toArr from '../helpers/toArr';
// import Form from './Form';
import './main.scss';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Minmax from './Minmax';
import LS from './LS';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaderActive: false,
            data: [],
            viewId: 2
        };
        injectTapEventPlugin();
    }
    
    clickCalcLSHandler = (func, start, end, deg, precision) => {
        this.setState({loaderActive: true});
        fetch('https://least-squares.herokuapp.com/least_squares', {
            method: 'POST',
            body: `${func}|${deg}|${start}|${end}|10|4`
        }).then(res => res.json())
            .then(res => this.setState({dataLS: res, loaderActive: false, precision}))
    }

    clickCalcMinmaxHandler = (func, start, end, deg, precision) => {
        this.setState({loaderActive: true});
        fetch(`https://min-max.herokuapp.com/minmaxGET?func=${func}&start=${start}&end=${end}&deg=${deg}&precision=${precision}`)
            .then(r => r.json())
            .then(r => {
                this.setState({data: toArr(r), loaderActive: false, precision});
            })
    }

    onMenuChange = (id) => {
        // console.log(id);
        this.setState({
            viewId: id
        });
    }
    render() {
        const style = {position: 'relative', top: '60px'};
        let view;
        if (this.state.viewId === 1) {
            view = <div style={style}>
                    <Header title={'МНК'} onMenuChange={this.onMenuChange} />
                    <LS clickCalcHandler={this.clickCalcLSHandler}
                        loaderActive={this.state.loaderActive}
                        data={this.state.dataLS} />
                </div>
        } else if (this.state.viewId === 2) {
            view = <div style={style}>
                <Header title={'Мінімакс'} onMenuChange={this.onMenuChange} />
                <Minmax
                    clickCalcHandler={this.clickCalcMinmaxHandler}
                    loaderActive={this.state.loaderActive}
                    data={this.state.data} precision={this.state.precision}
                />
            </div>
        } else if (this.state.viewId === 3) {
            view = <div style={style}>
                <Header title={'Порівняти Мінімакс і МНК'} onMenuChange={this.onMenuChange} />
                <Comparison />
            </div>
        } else if (this.state.viewId === 4) {
            view = <Header title={'Історія'} onMenuChange={this.onMenuChange} /> 
        }

        return (
            <MuiThemeProvider>
                <div style={{width: '60vw', margin: 'auto'}}>
                    {view}
                    {/*<Comparison />*/}
                    {/*<Minmax
                        clickCalcHandler={this.clickCalcHandler}
                        loaderActive={this.state.loaderActive}
                        data={this.state.data} precision={this.state.precision}
                    />*/}
                    {/*<Form onCalcClick={this.clickCalcHandler}/>
                    <Loader active={this.state.loaderActive}/>
                    <IterationList arr={this.state.data} precision={this.state.precision}/>*/}
                </div>
            </MuiThemeProvider>
        );
    }
}

