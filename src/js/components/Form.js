import React, { Component } from 'react';
import { TextField, RaisedButton } from 'material-ui';

class Form extends Component {

    constructor(props) {
        super(props);
        this.state = { disabled: true }
        this.validate = this.validate.bind(this);
    }
    
    validate() {
        if (this.func && this.deg && this.start && this.end) {
            this.setState({disabled: false})
        } else {
            this.setState({disabled: true})
        }
    }

    render() {
        return (
            <div class="form">
                <TextField
                    floatingLabelText="Функція, яку апроксимуємо"
                    type="text"
                    onChange={e => {this.func = e.target.value; this.validate()}} />

                <TextField
                    floatingLabelText="Степінь многочлена"
                    type="number"
                    onChange={e => {this.deg = e.target.value; this.validate()}} />

                <TextField
                    floatingLabelText="Початок інтервалу"
                    type="number"
                    onChange={e => {this.start = e.target.value; this.validate()}} />

                <TextField
                    floatingLabelText="Кінець інтервалу"
                    type="number"
                    onChange={e => {this.end = e.target.value; this.validate()}} />

                 <RaisedButton label="Обчислити"
                    primary={true}
                    disabled={this.state.disabled}
                    onClick={() => this.props.onCalcClick(this.func, this.start, this.end, this.deg)} />
            </div>
        );
    }
}

export default Form;