import React from 'react'
import Iteration from './Iteration'

export default class IterationList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
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
            </div>
        )
    }
}

