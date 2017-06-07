import React from 'react'
// import Rebase from 're-base'

import Header from './Header'
import Loader from './loader'
import LS from './LS'
import LSDiscrete from './LSDiscrete'
import Minmax from './Minmax'
import MinmaxDiscrete from './MinmaxDiscrete'
import Comparison from './Comparison'
import ComparisonDiscrete from './ComparisonDiscrete'
import History from './History'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Snackbar from 'material-ui/Snackbar'

import './main.scss'

import toArr from '../helpers/toArr'
import injectTapEventPlugin from 'react-tap-event-plugin'

import formsStates from './formsStates'

import { MINMAX_URL, LSSQ_URL, LSSQ_DISCRETE_URL, MINMAX_DISCRETE_URL } from './URLS'

// const base = Rebase.createClass('https://diplom-ff14d.firebaseio.com/')

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            history: [],
            isMinmax: true,
            isLssq: false,
            loaderActive: false,
            // errorMessage: false,
            message: '',
            data: [],
            dataLS: null,
            dataLS_discrete: null,
            dataMinmax_discrete: [],
            dataCompareMinmaxDiscrete: null,
            dataCompareLssqDiscrete: null,
            viewId: 2,
            comparison: {
                lssq: {
                    max_error: 0,
                    x_of_max_error: 0,
                    formula: '',
                    error_plot: []
                },
                minmax: {
                    max_err: 0,
                    x_of_max_err: 0,
                    func_plot: [],
                    pol_plot: [],
                    polynom_latex: '',
                    error_plot: []
                }
            }
        }

        injectTapEventPlugin()
    }


    getMaxErrs = (func, start, end, deg, precision, points) => {

        this.setState({
            loaderActive: true,
            message: ''
        })
        const lssq = () =>
            fetch(LSSQ_URL, {
                method: 'POST',
                body: JSON.stringify({func, start, end, deg, points})
            }).then(res => res.json())

        const minmax = () =>
            fetch(MINMAX_URL, {
                method: 'POST',
                body: JSON.stringify({func, start, end, deg, precision})
            }).then(res => res.json())
        const startTime = Date.now()
        Promise.all([lssq(), minmax()]).then(data => {
            const endTime = Date.now()
            this.setState({
                comparison: {
                    lssq: data[0],
                    minmax: toArr(data[1]).last(),
                },
                loaderActive: false,
                message: 'Затрачений час: ' + ((endTime - startTime) / 1000) + ' c.'
            })

        }).catch(e => {
                console.error(`Something went wrong!\n ${e}`)
                this.setState({loaderActive: false})
            })
    }

    clickCalcLSHandler = (func, start, end, deg, precision, points) => {

        this.setState({
            loaderActive: true,
            message: ''
        })
        const startTime = Date.now()
        fetch(LSSQ_URL, {
            method: 'POST',
            body: JSON.stringify({
                func, deg, start, end, points
            })
        }).then(res => res.json())
            .then(res => {
                const endTime = Date.now()
                this.setState({
                    dataLS: res,
                    loaderActive: false,
                    message: 'Затрачений час: ' + ((endTime - startTime) / 1000) + ' c.'
                })
            }).catch(e => {
                console.error(`Something went wrong!\n ${e}`)
                this.setState({loaderActive: false})
            })
    }
    
    clickCalcLSDiscreteHandler = (x_vals, y_vals, deg) => {

        this.setState({
            loaderActive: true,
            message: ''
        })

        const startTime = Date.now()

        fetch(LSSQ_DISCRETE_URL, {
            method: 'POST',
            body: JSON.stringify({x_vals, y_vals, deg})
        }).then(r => r.json()).then(res => {

            const endTime = Date.now()
            this.setState({
                dataLS_discrete: res,
                loaderActive: false,
                message: 'Затрачений час: ' + ((endTime - startTime) / 1000) + ' c.'
            })
        })
    }


    clickMinmaxDiscreteHandler = (x_vals, y_vals, deg) => {

        this.setState({
            loaderActive: true,
            message: ''
        })

        const startTime = Date.now()

        fetch(MINMAX_DISCRETE_URL, {
            method: 'POST',
            body: JSON.stringify({x_vals, y_vals, deg})
        }).then(r => r.json()).then(res => {
            const endTime = Date.now()

            this.setState({
                dataMinmax_discrete: toArr(res),
                loaderActive: false,
                message: 'Затрачений час: ' + ((endTime - startTime) / 1000) + ' c.'
            })
        })
    }

    clickCalcMinmaxHandler = (func, start, end, deg, precision) => {

        this.setState({
            loaderActive: true,
            message: ''
        })
        const startTime = Date.now()
        fetch(MINMAX_URL, {
            method: 'POST',
            body: JSON.stringify({func, start, end, deg, precision})
        })
            .then(r => r.json())
            .then(r => {
                const endTime = Date.now()
                this.setState({
                    data: toArr(r),
                    loaderActive: false,
                    message: 'Затрачений час: ' + ((endTime - startTime) / 1000) + ' c.'
                })

            }).catch(e => {
                console.error(`Something went wrong!\n ${e}`)
                this.setState({loaderActive: false})
            })
    }

    clickDiscreteCompare = (x_vals, y_vals, deg) => {
        let points = x_vals.map((x, i) => ({
            x,
            y: y_vals[i]
        }))

        const lssqDiscrete = fetch(LSSQ_DISCRETE_URL, {
            method: 'POST',
            body: JSON.stringify({x_vals, y_vals, deg})
        }).then(r => r.json())

        const minmaxDiscrete = fetch(MINMAX_DISCRETE_URL, {
            method: 'POST',
            body: JSON.stringify({x_vals, y_vals, deg})
        }).then(r => r.json())

        this.setState({
            loaderActive: true,
            message: ''
        })
        const startTime = Date.now()
        Promise.all([lssqDiscrete, minmaxDiscrete]).then(data => {
            const endTime = Date.now()
            this.setState({
                dataCompareMinmaxDiscrete: toArr(data[1]),
                dataCompareLssqDiscrete: data[0],
                loaderActive: false,
                message: 'Затрачений час: ' + ((endTime - startTime) / 1000) + ' c.'
            })
        })
    }

    handleHistory = (type) => {
        
        // valid types = ['comp_discrete', 'minmax', 'lssq', 'minmax_discrete', 'lssq_discrete', 'comp']
        switch (type, data) {
            case 'comp_discrete': {
                this.setState({
                    viewId: 7,
                    
                })
                
                break
            }
            case 'minmax': {
                this.setState({
                    viewId: 2,
                })
                break
            }
            case 'lssq': {
                this.setState({
                    viewId: 1
                })
                break
            }
            case 'minmax_discrete': {
                this.setState({
                    viewId: 6
                })
                break
            }
            case 'lssq_discrete': {
                this.setState({
                    viewId: 5
                })
                break
            }
            case 'comp': {
                this.setState({
                    viewId: 3
                })
                break
            }

            dafault: this.setState({viewId: 4})
        }
    }

    onMenuChange = (id) => {
        this.setState({
            viewId: id,
            message: ''
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
                    data={this.state.data}
                />
            </div>
        } else if (this.state.viewId === 3) {
            view = <div style={style}>
                <Header title={'Порівняти Мінімакс і МНК'} onMenuChange={this.onMenuChange} />
                <Comparison
                    formData={formsStates.comp}
                    clickCalcHandler={this.getMaxErrs}
                    minmax={this.state.comparison.minmax}
                    lssq={this.state.comparison.lssq}
                />
            </div>
        } else if (this.state.viewId === 4) {
            view = <div  style={style}>
                <Header title={'Історія'} onMenuChange={this.onMenuChange} /> 
                <History
                    history={this.state.history}
                    onItemClick={this.handleHistory}
                />
            </div>
        } else if (this.state.viewId === 5) {
            view = <div  style={style}>
                <Header title={'МНК (дискретна функція)'} onMenuChange={this.onMenuChange} /> 
                <LSDiscrete clickCalcHandler={this.clickCalcLSDiscreteHandler}
                        formData={formsStates.lssq_discrete}
                        data={this.state.dataLS_discrete}
                />
            </div>  
        } else if (this.state.viewId === 6) {
            view = <div  style={style}>
                <Header title={'Мінімакс (дискретна функція)'} onMenuChange={this.onMenuChange} /> 
                <MinmaxDiscrete
                    clickCalcHandler={this.clickMinmaxDiscreteHandler}
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
                    <Snackbar
                        open={!!this.state.message}
                        message={this.state.message}
                        autoHideDuration={4000}
                        bodyStyle={{backgroundColor: 'rgb(0, 188, 212)'}}
                    />
                </div>
            </MuiThemeProvider>
        )
    }
}

export default App