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
                    floatingLabelText="Функція, яку апроксимуємо"
                    type="text"
                    defaultValue={this.props.formData.func}
                    onChange={(e) => this.props.formData.func = e.target.value}
                />

                <TextField
                    floatingLabelText="Степінь многочлена"
                    type="number"
                    defaultValue={this.props.formData.deg}
                    onChange={(e) => this.props.formData.deg = e.target.value}
                />

                <TextField
                    floatingLabelText="Початок інтервалу"
                    type="number"
                    defaultValue={this.props.formData.start}
                    onChange={(e) => this.props.formData.start = e.target.value}
                />

                <TextField
                    floatingLabelText="Кінець інтервалу"
                    type="number"
                    defaultValue={this.props.formData.end}
                    onChange={(e) => this.props.formData.end = e.target.value}
                />

                {this.props.minmax && <TextField
                    floatingLabelText="Точність"
                    type="number"
                    defaultValue={this.props.formData.presicion}
                    onChange={(e) => this.props.formData.percision = e.target.value}
                />}

                {this.props.lssq && <TextField
                    floatingLabelText="Точки розбиття"
                    type="number"
                    defaultValue={this.props.formData.points}
                    onChange={(e) => this.props.formData.points = e.target.value}
                />}

                 <RaisedButton label="Обчислити"
                    primary={true}
                    disabled={this.props.formData.disabled}
                    onClick={() => this.props.onCalcClick(this.props.formData.func, this.props.formData.start, this.props.formData.end, this.props.formData.deg, this.props.formData.presicion, this.props.formData.points)}
                />

            </div>
        );
    }
}

export default Form;