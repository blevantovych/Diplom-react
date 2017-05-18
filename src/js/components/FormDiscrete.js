import React, { Component, PureComponent } from 'react';
import { TextField, RaisedButton } from 'material-ui';


class Form extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            x_vals: '',
            y_vals: '',
            points: []
        }
    }

    onFileUpload = (event) => {
        var input = event.target
        var reader = new FileReader()
        reader.onload = () => {
            var data = reader.result
            let rows = data.split('\n')
            let points = []
            let x_vals = rows[0].split(/,\s?/g)
            let y_vals = rows[1].split(/,\s?/g)
            x_vals.forEach((val, i) => {
                points.push({x: +val, y: +y_vals[i]})
            })
            this.setState({points, x_vals: x_vals.join(' '), y_vals: y_vals.join(' ')})
        }
        reader.readAsText(input.files[0])
    }

    render() {
        let x_vals_tds = this.state.points.map(val => <td>{val.x}</td>)
        let y_vals_tds = this.state.points.map(val => <td>{val.y}</td>)

        console.log('X_vals_tds: ', x_vals_tds)
        console.log('Y_vals_tds: ', y_vals_tds)
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
                {x_vals_tds.length > 1 && <table id="ls_disc_table">
                    <tr>
                        <td>X</td>
                        {x_vals_tds}
                        <RaisedButton
                            label="Посортувати"
                            onTouchTap={() => {
                                console.log('sorting')
                                this.setState({points: [...this.state.points].sort((p1, p2) => p1.x > p2.x ? 1 : -1)})
                            }}></RaisedButton>
                    </tr>
                    <tr>
                        <td>Y</td>
                        {y_vals_tds}
                    </tr>
                </table>}

            </div>
        );
    }
}

export default Form;