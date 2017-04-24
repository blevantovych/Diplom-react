import React, { Component } from 'react';
import { TextField, RaisedButton } from 'material-ui';


class Form extends Component {

    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
            func: 'ln(x)',
            deg: 1,
            start: 1,
            end: 3,
            presicion: 0.01
        };
    }
    

    render() {
        return (
            <div class="form">
                <TextField
                    floatingLabelText="Функція, яку апроксимуємо"
                    type="text"
                    defaultValue={this.state.func}
                    onChange={(e) => this.setState({func: e.target.value})}
                />

                <TextField
                    floatingLabelText="Степінь многочлена"
                    type="number"
                    defaultValue={this.state.deg}
                    onChange={(e) => this.setState({deg: e.target.value})}
                />

                <TextField
                    floatingLabelText="Початок інтервалу"
                    type="number"
                    defaultValue={this.state.start}
                    onChange={(e) => this.setState({start: e.target.value})}
                />

                <TextField
                    floatingLabelText="Кінець інтервалу"
                    type="number"
                    defaultValue={this.state.end}
                    onChange={(e) => this.setState({end: e.target.value})}
                />

                <TextField
                    floatingLabelText="Точність"
                    type="number"
                    defaultValue={this.state.presicion}
                    onChange={(e) => this.setState({presicion: e.target.value})}
                />

                 <RaisedButton label="Обчислити"
                    primary={true}
                    disabled={this.state.disabled}
                    onClick={() => this.props.onCalcClick(this.state.func, this.state.start, this.state.end, this.state.deg, this.state.presicion)}
                />

            </div>
        );
    }
}

export default Form;