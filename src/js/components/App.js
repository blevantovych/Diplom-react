import React from 'react';
import Rebase from 're-base';

import Header from './Header';
import Loader from './loader';
import ErrorMessage from './ErrorMessage'
import LS from './LS';
import Minmax from './Minmax';
import Comparison from './Comparison';
import History from './History';


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './main.scss';

import toArr from '../helpers/toArr';
import injectTapEventPlugin from 'react-tap-event-plugin';

const base = Rebase.createClass('https://diplom-ff14d.firebaseio.com/')


let formsStates = {
    minmax: {
        disabled: false,
        func: 'ln(x)',
        deg: 1,
        start: 1,
        end: 3,
        presicion: 0.01,
        points: 10
    },
    lssq: {
        disabled: false,
        func: 'ln(x)',
        deg: 1,
        start: 1,
        end: 3,
        presicion: 0.01,
        points: 10
    },
    comp: {
        disabled: false,
        func: 'ln(x)',
        deg: 1,
        start: 1,
        end: 3,
        presicion: 0.01,
        points: 10
    }
}

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [],
            isMinmax: true,
            isLssq: false,
            loaderActive: false,
            errorMessage: false,
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

    

    saveToFire = (data) => {
        base.post('history', {
            data: this.state.history.concat([data])
        })
    }
    
    getMaxErrs = (func, start, end, deg, precision, points) => {
         let result = {
            type: 'comp',
            id: `${func}|${start}|${end}|${deg}|${precision}|${points}`,
            inputData: {
                func, start, end, deg, points, precision
            }
        }
        this.setState({loaderActive: true});
        const lssq = () => fetch('https://least-squares.herokuapp.com/least_squares', {
        // const lssq = () => fetch('http://localhost:5000/least_squares', {
            method: 'POST',
            body: `${func}|${deg}|${start}|${end}|10|4`
        }).then(res => res.json())

        const minmax = () => fetch(`https://min-max.herokuapp.com/minmaxGET?func=${func}&start=${start}&end=${end}&deg=${deg}&precision=${precision}`)
        // const minmax = () => fetch(`http://localhost:5000/minmaxGET?func=${func}&start=${start}&end=${end}&deg=${deg}&precision=${precision}`)
                                .then(res => res.json())

        Promise.all([lssq(), minmax()]).then(data => {
            this.setState({
                comparison: {
                    lssq: data[0],
                    minmax: toArr(data[1]).last(),
                },
                loaderActive: false
            })
            result.output = data
            this.saveToFire(result)
        }).catch(e => {
                console.error(`Something went wrong!\n ${e}`)
                this.setState({loaderActive: false})
            })
    }

    clickCalcLSHandler = (func, start, end, deg, precision, points) => {
        let result = {
            type: 'lssq',
            id: `${func}|${start}|${end}|${deg}|${points}`,
            inputData: {
                func, start, end, deg, points
            }
        }
        this.setState({loaderActive: true});
        fetch('https://least-squares.herokuapp.com/least_squares', {
        // fetch('http://localhost:5000/least_squares', {
            method: 'POST',
            body: `${func}|${deg}|${start}|${end}|${points}`
        }).then(res => res.json())
            .then(res => {
                this.setState({dataLS: res, loaderActive: false, precision})
                result.output = res
                this.saveToFire(result)
            }).catch(e => {
                console.error(`Something went wrong!\n ${e}`)
                this.setState({loaderActive: false})
            })
    }

    clickCalcMinmaxHandler = (func, start, end, deg, precision) => {
        let result = {
            type: 'minmax',
            id: `${func}|${start}|${end}|${deg}|${precision}`,
            inputData: {
                func, start, end, deg, precision
            }
        }
        this.setState({loaderActive: true});
        fetch(`https://min-max.herokuapp.com/minmaxGET?func=${func}&start=${start}&end=${end}&deg=${deg}&precision=${precision}`)
        // fetch(`http://localhost:5000/minmaxGET?func=${func}&start=${start}&end=${end}&deg=${deg}&precision=${precision}`)
            .then(r => r.json())
            .then(r => {
                this.setState({data: toArr(r), loaderActive: false, precision});
                result.output = r
                this.saveToFire(result)
            }).catch(e => {
                console.error(`Something went wrong!\n ${e}`)
                this.setState({loaderActive: false, errorMessage: true})
            })
    }

    onMenuChange = (id) => {
        this.setState({
            viewId: id
        });
    }

    render() {
        const style = {position: 'relative', top: '60px', marginBottom: '60px'};
        // const style = {}
        let view;
        if (this.state.viewId === 1) {
            view = <div style={style}>
                    <Header title={'МНК'} onMenuChange={this.onMenuChange} />
                    <LS clickCalcHandler={this.clickCalcLSHandler}
                        formData={formsStates.lssq}
                        data={this.state.dataLS} />
                </div>
        } else if (this.state.viewId === 2) {
            view = <div style={style}>
                <Header title={'Мінімакс'} onMenuChange={this.onMenuChange} />
                <Minmax
                    formData={formsStates.minmax}
                    clickCalcHandler={this.clickCalcMinmaxHandler}
                    data={this.state.data} precision={this.state.precision}
                />
            </div>
        } else if (this.state.viewId === 3) {
            view = <div style={style}>
                <Header title={'Порівняти Мінімакс і МНК'} onMenuChange={this.onMenuChange} />
                <Comparison formData={formsStates.comp} clickCalcHandler={this.getMaxErrs} minmax={this.state.comparison.minmax} lssq={this.state.comparison.lssq} />
            </div>
        } else if (this.state.viewId === 4) {
            view = <div  style={style}>
                <Header title={'Історія'} onMenuChange={this.onMenuChange} /> 
                <History history={this.state.history}/>
            </div>  
        }

        return (
            <MuiThemeProvider>
                <div style={{width: '60vw', margin: 'auto'}}>
                    {view}
                    <Loader active={this.state.loaderActive} />
                    <ErrorMessage open={this.state.errorMessage} />
                </div>
            </MuiThemeProvider>
        );
    }
}

