import React from 'react'
import Rebase from 're-base'

import Header from './Header'
import Loader from './loader'
import LS from './LS'
import LSDiscrete from './LSDiscrete'
import Minmax from './Minmax'
import Minmax_Discrete from './Minmax_Discrete'
import Comparison from './Comparison'
import ComparisonDiscrete from './ComparisonDiscrete'
import History from './History'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import './main.scss'

import toArr from '../helpers/toArr'
import injectTapEventPlugin from 'react-tap-event-plugin'

import formsStates from './formsStates'

const base = Rebase.createClass('https://diplom-ff14d.firebaseio.com/')

import { MINMAX_URL, LSSQ_URL, LSSQ_DISCRETE_URL, MINMAX_DISCRETE_URL } from './URLS'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            history: [],
            isMinmax: true,
            isLssq: false,
            loaderActive: false,
            // errorMessage: false,
            data: [],
            dataLS: null,
            dataLS_discrete: null,
            dataMinmax_discrete: [],
            dataCompareMinmaxDiscrete: null,
            dataCompareLssqDiscrete: null,
            viewId: 6,
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
        }
         this.ref = base.bindToState('history', {
            context: this,
            asArray: true,
            state: 'history'
        })
        injectTapEventPlugin()
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
            },
            date: Date.now()
        }
        this.setState({loaderActive: true})
        const lssq = () => fetch(LSSQ_URL, {
            method: 'POST',
            body: `${func}|${deg}|${start}|${end}|${points}|4`
        }).then(res => res.json())

        const minmax = () => fetch(`${MINMAX_URL}func=${encodeURIComponent(func)}&start=${start}&end=${end}&deg=${deg}&precision=${precision}`)
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
            },
            date: Date.now()
        }
        this.setState({loaderActive: true})
        fetch(LSSQ_URL, {
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
    
    clickCalcLS_DiscreteHandler = (x_vals, y_vals, deg) => {
        let result = {
            type: 'lssq_discrete',
            inputData: {
                x_vals, y_vals, deg
            },
            date: Date.now()
        }
        this.setState({loaderActive: true})

        fetch(LSSQ_DISCRETE_URL, {
            method: 'POST',
            body: JSON.stringify({x_vals, y_vals, deg})
        }).then(r => r.json()).then(res => {
            result.output = res
            this.saveToFire(result)
            this.setState({dataLS_discrete: res, loaderActive: false})
        })
    }

    clickMinmax_DiscreteHandler = (x_vals, y_vals, deg) => {
        let result = {
            type: 'minmax_discrete',
            inputData: {
                x_vals, y_vals, deg
            },
            date: Date.now()
        }
        this.setState({loaderActive: true})

        fetch(MINMAX_DISCRETE_URL, {
            method: 'POST',
            body: JSON.stringify({x_vals, y_vals, deg})
        }).then(r => r.json()).then(res => {
            result.output = res
            this.saveToFire(result)
            this.setState({dataMinmax_discrete: toArr(res), loaderActive: false})
        })
    }

    clickCalcMinmaxHandler = (func, start, end, deg, precision) => {
        let result = {
            type: 'minmax',
            id: `${func}|${start}|${end}|${deg}|${precision}`,
            inputData: {
                func, start, end, deg, precision
            },
            date: Date.now()
        }

        this.setState({loaderActive: true})
        console.log(`func=${func}&start=${start}&end=${end}&deg=${deg}&precision=${precision}`)
        fetch(`${MINMAX_URL}func=${encodeURIComponent(func)}&start=${start}&end=${end}&deg=${deg}&precision=${precision}`)
            .then(r => r.json())
            .then(r => {
                this.setState({data: toArr(r), loaderActive: false, precision})
                result.output = r
                this.saveToFire(result)
            }).catch(e => {
                console.error(`Something went wrong!\n ${e}`)
                this.setState({loaderActive: false})
            })
    }

    clickDiscreteCompare = (x_vals, y_vals, deg) => {
        let result = {
            type: 'comp_discrete',
            inputData: {
                x_vals, y_vals, deg
            },
            date: Date.now()
        }
        const lssqDiscrete = fetch(LSSQ_DISCRETE_URL, {
            method: 'POST',
            body: JSON.stringify({x_vals, y_vals, deg})
        }).then(r => r.json())

        const minmaxDiscrete = fetch(MINMAX_DISCRETE_URL, {
            method: 'POST',
            body: JSON.stringify({x_vals, y_vals, deg})
        }).then(r => r.json())
        this.setState({loaderActive: true})

        Promise.all([lssqDiscrete, minmaxDiscrete]).then(data => {
            console.log(data)
            this.setState({
                dataCompareMinmaxDiscrete: toArr(data[1]),
                dataCompareLssqDiscrete: data[0],
                loaderActive: false
            })
            result.output = data
            this.saveToFire(result)
        })
    }

    onMenuChange = (id) => {
        this.setState({
            viewId: id
        })
    }

    render() {
        const style = {position: 'relative', top: '60px', marginBottom: '60px'}
        let view
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
        } else if (this.state.viewId === 5) {
            view = <div  style={style}>
                <Header title={'МНК (дискретна функція)'} onMenuChange={this.onMenuChange} /> 
                <LSDiscrete clickCalcHandler={this.clickCalcLS_DiscreteHandler}
                        formData={formsStates.lssq_discrete}
                        data={this.state.dataLS_discrete}
                />
            </div>  
        } else if (this.state.viewId === 6) {
            view = <div  style={style}>
                <Header title={'Мінімакс (дискретна функція)'} onMenuChange={this.onMenuChange} /> 
                <Minmax_Discrete
                    clickCalcHandler={this.clickMinmax_DiscreteHandler}
                    formData={formsStates.minmax_discrete}
                    data={this.state.dataMinmax_discrete}
                 />
            </div>  
        } else if (this.state.viewId === 7) {
            view = <div  style={style}>
                <Header title={'Порівняти Мінімакс і МНК'} onMenuChange={this.onMenuChange} /> 
                <ComparisonDiscrete
                    clickCalcHandler={this.clickDiscreteCompare}
                    formData={formsStates.compare_discrete}
                    minmaxData={this.state.dataCompareMinmaxDiscrete}
                    lssqData={this.state.dataCompareLssqDiscrete}
                 />
            </div>  
        }

        return (
            <MuiThemeProvider>
                <div style={{width: '60vw', margin: 'auto'}}>
                    {view}
                    <Loader active={this.state.loaderActive} />
                    {/*<ErrorMessage open={this.state.errorMessage} />*/}
                </div>
            </MuiThemeProvider>
        )
    }
}

export default App