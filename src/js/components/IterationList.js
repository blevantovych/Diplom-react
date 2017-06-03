import React from 'react'
import Iteration from './Iteration'

export default class IterationList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const computationTime = this.props.arr.length > 0
                        ? `Час рахування: ${this.props.arr[0].computation_time.toFixed(2)}` 
                        : null

        const iters = this.props.arr.map((el, i, a) => {
            return <Iteration
                        isLast={i === a.length - 1}
                        key={i}
                        ctn={i}
                        data={el}
                        precision={this.props.precision}
                    /> 
        })
        return (
            <div>
                {iters}
                {computationTime}
            </div>
        )
    }
}

