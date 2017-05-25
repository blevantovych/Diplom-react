import React, { Component } from 'react'
import IterationList from './IterationList'
import Form from './Form'

class Minmax extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <div>
                <Form
                    formData={this.props.formData}
                    onCalcClick={this.props.clickCalcHandler}
                    minmax={true}
                />
                <IterationList arr={this.props.data} precision={this.props.precision} />
            </div>
        )
    }
}

export default Minmax