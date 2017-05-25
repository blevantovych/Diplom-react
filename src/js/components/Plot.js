import React, { Component } from 'react'

class Plot extends Component {
    constructor(props) {
        super(props)
    }

    renderPlot = () => {
        if (this.props.legend === false) {
            Plotly.newPlot('plot' + this.props.id, this.props.plotData, {title: this.props.title, showlegend: false})
        } else {
            Plotly.newPlot('plot' + this.props.id, this.props.plotData, {title: this.props.title})
        }
    }

    componentDidUpdate(prevProps, prevState) {
        this.renderPlot()
    }

    componentDidMount() {
        this.renderPlot()
    }

    render() {

        return (
            <div id={'plot' + this.props.id}></div>
        )
    }
}

export default Plot