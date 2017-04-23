import React, { Component } from 'react';
import { TextField, RaisedButton } from 'material-ui';

class Form extends Component {
    render() {
        return (
            <div class="form">
                <TextField hintText="Функція, яку апроксимуємо"
                     type="text"
                     onChange={e => this.func = e.target.value} />

                <TextField hintText="Степінь многочлена"
                     type="number"
                     onChange={e => this.deg = e.target.value} />

                <TextField hintText="Початок інтервалу"
                     type="number"
                     onChange={e => this.start = e.target.value} />

                <TextField hintText="Кінець інтервалу"
                     type="number"
                     onChange={e => this.end = e.target.value} />


                 <RaisedButton label="Обчислити"
                    primary={ true }
                    disabled={ this.credentials }
                    onClick={() => this.props.onCalcClick(this.func, this.start, this.end, this.deg)} />
            </div>
        );
    }
}

export default Form;