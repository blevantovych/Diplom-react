import React, { Component } from 'react';

class Form extends Component {
    render() {
        return (
            <div>
                <div class="form-group">
                    <label for="function">Функція, яку апроксимуємо</label>
                    <input type="text" id="function" class="form-control" />
                </div>

                <div class="form-group">
                    <label for="deg">Степінь многочлена, яким апроксимуємо</label>
                    <input type="number" id="deg" class="form-control" />
                </div>

                <div class="form-group">
                    <label for="start">Початок інтервалу</label>
                    <input type="number" id="start" class="form-control" />
                </div>

                <div class="form-group">
                    <label for="end">Кінець інтервалу</label>
                    <input type="number" id="end" class="form-control" />
                </div>

                <div class="form-group">
                    <label for="after_point">Кількість знаків після коми в коефіцієнтах</label>
                    <input type="number" id="after_point" class="form-control" />
                </div>

                <button
                    id="btn-find"
                    class="btn btn-success"
                    type="submit"
                    onClick={() => this.props.onCalcClick('E^x', '-1', '4', '3')}>Обчислити</button>
            </div>
        );
    }
}

export default Form;