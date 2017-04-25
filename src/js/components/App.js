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

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaderActive: false,
            data: [],
            viewId: 2
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

    onMenuChange = (id) => {
        // console.log(id);
        this.setState({
            viewId: id
        });
    }

    render() {
        let view;
        if (this.state.viewId === 1) {
            view = <div>
                    <Header title={'МНК'} onMenuChange={this.onMenuChange} />
                    <h1>МНК</h1>
                </div>
        } else if (this.state.viewId === 2) {
            view = <div>
                <Header title={'Мінімакс'} onMenuChange={this.onMenuChange} />
                <Minmax
                    clickCalcHandler={this.clickCalcHandler}
                    loaderActive={this.state.loaderActive}
                    data={this.state.data} precision={this.state.precision}
                />
            </div>
        } else if (this.state.viewId === 3) {
            view = <div>
                <Header title={'Порівняти Мінімакс і МНК'} onMenuChange={this.onMenuChange} />
                <Comparison />
            </div>
        }

        return (
            <MuiThemeProvider>
                <div>
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

