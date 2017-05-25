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
        return (
            <div>
                {iters}
            </div>
        )
    }
}

