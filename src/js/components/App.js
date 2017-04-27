import React from 'react';
import Header from './Header';
// import IterationList from './IterationList';
import Loader from './loader';
import Comparison from './Comparison';
import toArr from '../helpers/toArr';
// import Form from './Form';
import './main.scss';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Minmax from './Minmax';
import LS from './LS';
import Rebase from 're-base';

const base = Rebase.createClass('https://diplom-ff14d.firebaseio.com/')

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [],
            isMinmax: true,
            isLssq: false,
            loaderActive: false,
            data: [],
            dataLs: [],
            viewId: 2,
            comparison: {
                lssq: {
                    max_error: 0,
                    x_of_max_error: 0,
                    formula: ''
                },
                minmax: {
                    max_err: 0,
                    x_of_max_err: 0,
                    func_plot: [],
                    pol_plot: [],
                    polynom_latex: ''
                }
            }
        };
         this.ref = base.bindToState('history', {
            context: this,
            asArray: true,
            state: 'history'
        });
        injectTapEventPlugin();
    }

    
    saveToFire = (func) => {
        base.post('history', {
            data: this.state.history.concat([{func}])
        })
    }
    
    getMaxErrs = (func, start, end, deg, precision) => {

        this.setState({loaderActive: true});
        const lssq = () => fetch('https://least-squares.herokuapp.com/least_squares', {
            method: 'POST',
            body: `${func}|${deg}|${start}|${end}|10|4`
        }).then(res => res.json())

        const minmax = () => fetch(`https://min-max.herokuapp.com/minmaxGET?func=${func}&start=${start}&end=${end}&deg=${deg}&precision=${precision}`)
                                .then(res => res.json())

        Promise.all([lssq(), minmax()]).then(data => {
            this.setState({
                comparison: {
                    lssq: data[0],
                    minmax: toArr(data[1]).last(),
                },
                loaderActive: false
                
            })
        })
    }

    clickCalcLSHandler = (func, start, end, deg, precision, points) => {
        this.setState({loaderActive: true});
        fetch('https://least-squares.herokuapp.com/least_squares', {
            method: 'POST',
            body: `${func}|${deg}|${start}|${end}|${points}`
        }).then(res => res.json())
            .then(res => this.setState({dataLS: res, loaderActive: false, precision}))
    }

    clickCalcMinmaxHandler = (func, start, end, deg, precision) => {
        this.saveToFire(func)
        this.setState({loaderActive: true});
        fetch(`https://min-max.herokuapp.com/minmaxGET?func=${func}&start=${start}&end=${end}&deg=${deg}&precision=${precision}`)
            .then(r => r.json())
            .then(r => {
                this.setState({data: toArr(r), loaderActive: false, precision});
            })
    }

    onMenuChange = (id) => {
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
                        data={this.state.dataLS} />
                </div>
        } else if (this.state.viewId === 2) {
            view = <div style={style}>
                <Header title={'Мінімакс'} onMenuChange={this.onMenuChange} />
                <Minmax
                    clickCalcHandler={this.clickCalcMinmaxHandler}
                    data={this.state.data} precision={this.state.precision}
                />
            </div>
        } else if (this.state.viewId === 3) {
            view = <div style={style}>
                <Header title={'Порівняти Мінімакс і МНК'} onMenuChange={this.onMenuChange} />
                <Comparison clickCalcHandler={this.getMaxErrs} minmax={this.state.comparison.minmax} lssq={this.state.comparison.lssq} />
            </div>
        } else if (this.state.viewId === 4) {
            view = <Header title={'Історія'} onMenuChange={this.onMenuChange} /> 
        }

        return (
            <MuiThemeProvider>
                <div style={{width: '60vw', margin: 'auto'}}>
                    {view}
                    <Loader active={this.state.loaderActive} />
                </div>
            </MuiThemeProvider>
        );
    }
}

