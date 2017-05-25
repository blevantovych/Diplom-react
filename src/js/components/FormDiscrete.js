import React, { Component, PureComponent } from 'react'
import { TextField, RaisedButton } from 'material-ui'

class Form extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            points: this.props.formData.points
        }
    }

    onFileUpload = (event, type='vert') => {
        var input = event.target
        var reader = new FileReader()
        reader.onload = () => {
            // if horizontal
            var data = reader.result
            let rows = data.split('\n')
            let points = []
            if (type === 'hor') {
                let x_vals = rows[0].split(/,\s?/g)
                let y_vals = rows[1].split(/,\s?/g)
                x_vals.forEach((val, i) => {
                    points.push({x: +val, y: +y_vals[i]})
                })    
            } else if (type === 'vert') {
                rows.forEach((row, i) => {
                    let xy = row.split(/,\s?/)
                    console.log(xy)
                    points.push({x: +xy[0], y: +xy[1]})
                })
            }

            this.setState({points})
            this.props.formData.points = points
        }
        reader.readAsText(input.files[0])
    }

    componentWillUnmount() {
        this.props.formData.points = this.state.points
    }
    
    render() {
        let x_vals_tds = this.state.points.map(val => <td><TextField value={val.x} onChange={(e) => {val.x = e.target.value this.forceUpdate()}} style={{width: '50px'}} /></td>)
        let y_vals_tds = this.state.points.map(val => <td><TextField value={val.y} onChange={(e) => {val.y = e.target.value this.forceUpdate()}} style={{width: '50px'}} /></td>)

        return (
            <div class="form">

                <TextField
                    floatingLabelText="Степінь"
                    type="number"
                    defaultValue={this.props.formData.deg}
                    onChange={(e) => this.props.formData.deg = e.target.value}
                />

                {x_vals_tds.length > 0 && <table id="ls_disc_table">
                    <tr>
                        <td>X</td>
                        {x_vals_tds}
                        <RaisedButton
                            label="Посортувати"
                            onTouchTap={() => {
                                this.setState({points: [...this.state.points].sort((p1, p2) => p1.x > p2.x ? 1 : -1)})
                            }}></RaisedButton>
                    </tr>
                    <tr>
                        <td>Y</td>
                        {y_vals_tds}
                         <RaisedButton label="Додати точку"
                            secondary={true}
                            containerElement="label"
                            onTouchTap={() => this.setState({points: [...this.state.points, {x: 0, y: 0}]})}
                        />
                    </tr>
                </table>}
                <br/> 
                
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
                        let xs = this.state.points.map(p => +p.x)
                        let ys = this.state.points.map(p => +p.y)
                        this.props.onCalcClick(xs, ys, +this.props.formData.deg)
                    }}
                />

            </div>
        )
    }
}

export default Form