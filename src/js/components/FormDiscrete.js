import React, { Component, PureComponent } from 'react';
import { TextField, RaisedButton } from 'material-ui';


class Form extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            x_vals: '',
            y_vals: ''
        }
    }

    onFileUpload = (event) => {
        var input = event.target
        var reader = new FileReader()
        reader.onload = () => {
            var data = reader.result
            let rows = data.split('\n')
            this.setState({ x_vals: rows[0].split(/,\s?/g).join(' ')})
            this.setState({ y_vals: rows[1].split(/,\s?/g).join(' ')})
        }
        reader.readAsText(input.files[0])
    }

    render() {
        return (
            <div class="form">
                <TextField
                    floatingLabelText="Значення x"
                    type="text"
                    ref="x_input"
                    value={this.state.x_vals}
                    onChange={(e) => this.setState({x_vals: e.target.value})}
                />

                <TextField
                    floatingLabelText="Значення y"
                    type="text"
                    ref="y_input"
                    value={this.state.y_vals}
                    onChange={(e) => this.setState({y_vals: e.target.value})}
                />

                <TextField
                    floatingLabelText="Степінь"
                    type="number"
                    defaultValue={this.props.formData.deg}
                    onChange={(e) => this.props.formData.deg = e.target.value}
                />

                <RaisedButton label="Завантажити CSV"
                    secondary={true}
                    containerElement="label"
                ><input
                    style={{"cursor":"pointer","position":"absolute","top":"0","bottom":"0","right":"0","left":"0","width":"100%","opacity":"0"}}
                    type="file"
                    onChange={this.onFileUpload} />
                </RaisedButton>

                 <RaisedButton label="Обчислити"
                    primary={true}
                    disabled={this.props.formData.disabled}
                    onClick={() => {
                        this.props.formData.x_vals = this.state.x_vals.split(' ').map(n => +n)
                        this.props.formData.y_vals = this.state.y_vals.split(' ').map(n => +n)
                        this.props.onCalcClick(this.props.formData.x_vals, this.props.formData.y_vals, +this.props.formData.deg)
                    }}
                />

            </div>
        );
    }
}

export default Form;