import React, { Component } from 'react';

import IterationList from './IterationList';
import Loader from './loader';
import Form from './Form';
import Plot from './Plot';

class LS extends Component {
    render() {
        console.log(this.props);
        return (
            <div>
                <Form onCalcClick={this.props.clickCalcHandler} />
                <Loader active={this.props.loaderActive} />
                {this.props.data && <Plot id="ls_plot"
                    plotData={[
                        {...this.props.data.max_error_line, name: 'Максимальна похибка'},
                        {x: this.props.data.x_vals, y: this.props.data.y_vals, mode: 'markers', name: 'Точки (викор. в МНК)'},
                        {x: this.props.data.x_approx, y: this.props.data.approximation, name: 'Апроксимація'},
                        {x: this.props.data.x_approx, y: this.props.data.f_x_approx, name: 'Функція'}
                    ]}/>}
            </div>
        );
    }
}

export default LS;