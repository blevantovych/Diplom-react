import React, { Component, PureComponent } from 'react';
import { TextField, RaisedButton } from 'material-ui';


class Form extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="form">
                <TextField
                    floatingLabelText="Значення x"
                    type="text"
                    defaultValue={this.props.formData.x_vals}
                    onChange={(e) => this.props.formData.x_vals = e.target.value.split(' ').map(n => +n)}
                />

                <TextField
                    floatingLabelText="Значення y"
                    type="text"
                    defaultValue={this.props.formData.y_vals}
                    onChange={(e) => this.props.formData.y_vals = e.target.value.split(' ').map(n => +n)}
                />

                <TextField
                    floatingLabelText="Степінь"
                    type="number"
                    defaultValue={this.props.formData.deg}
                    onChange={(e) => this.props.formData.deg = e.target.value}
                />

                 <RaisedButton label="Обчислити"
                    primary={true}
                    disabled={this.props.formData.disabled}
                    onClick={() => this.props.onCalcClick(this.props.formData.x_vals, this.props.formData.y_vals, +this.props.formData.deg)}
                />

            </div>
        );
    }
}

export default Form;