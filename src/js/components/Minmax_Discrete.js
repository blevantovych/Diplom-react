import React, { Component } from 'react'
import FormDiscrete from './FormDiscrete'
import IterationListDiscreteMinmax from './IterationListDiscreteMinmax'

class Minmax_Discrete extends Component {
    render() {
        return (
            <div>
                <FormDiscrete
                    formData={this.props.formData}
                    onCalcClick={this.props.clickCalcHandler}
                />
                <IterationListDiscreteMinmax arr={this.props.data} />
            </div>
        )
    }
}

export default Minmax_Discrete