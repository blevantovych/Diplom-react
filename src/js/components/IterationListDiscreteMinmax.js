import React from 'react'
import IterationMinmaxDiscrete from './IterationMinmaxDiscrete'

export default class IterationListDiscreteMinmax extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const iters = this.props.arr.map((el, i, a) => {
            return <IterationMinmaxDiscrete key={i} ctn={i} data={el} /> 
        })
        const computationTime = this.props.arr.length > 0
                ? `Час рахування: ${this.props.arr[0].computation_time.toFixed(2)}` 
                : null
        return (
            <div>
                {iters}
                {computationTime}
            </div>
        )
    }
}

