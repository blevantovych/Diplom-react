import React, { Component } from 'react'

class Plot extends Component {
    constructor(props) {
        super(props)
    }

    renderPlot = () => {
        const leftPoint = Math.min(...this.props.plotData.map(p => p.x[0]))
        const rightPoint = Math.max(...this.props.plotData.map(p => p.x[p.x.length-1]))
        const add = (rightPoint - leftPoint) / 40
        const xRange = {range: [leftPoint - add, rightPoint + add]}
        if (this.props.legend === false) {
            Plotly.newPlot('plot' + this.props.id, this.props.plotData,
                {
                    title: this.props.title,
                    showlegend: false,
                    xaxis: xRange
                })
        } else {
            Plotly.newPlot('plot' + this.props.id, this.props.plotData,
                {
                    title: this.props.title,
                    xaxis: xRange
                })
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