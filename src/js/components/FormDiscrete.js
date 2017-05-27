import React, { Component, PureComponent } from 'react'
import { TextField, RaisedButton } from 'material-ui'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import chunk from 'lodash.chunk'

function to_json(workbook) {
    var result = {}
    workbook.SheetNames.forEach(function(sheetName) {
        var roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])
        if (roa.length > 0) {
            result[sheetName] = roa
        }
    })

    return result
}



class Form extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            points: this.props.formData.points,
            excelTableHeaders: [],
            excelTableInJson: null,
            X: '',
            Y: ''
        }
    }

    processWorkBook = (wb) => {
        let excelTableInJson = to_json(wb).Sheet1
        let headers = Object.keys(excelTableInJson[0])
        console.log('Headers\n', headers)
        this.setState({
            excelTableHeaders: headers,
            excelTableInJson
        })
    }

    onExcelUpload = (e) => {
        let file = e.target.files[0]
        let reader = new FileReader()
        reader.onload = e => {
            let data = e.target.result
            let wb = XLSX.read(data, {type: 'binary'})
            this.processWorkBook(wb)
        }
        reader.readAsBinaryString(file)
    }

    onFileUpload = (event, type='vert') => {
        const input = event.target
        const reader = new FileReader()
        reader.onload = () => {
            // if horizontal
            const data = reader.result
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
        let sortButton = <RaisedButton
                            label="Посортувати"
                            onTouchTap={() => {
                                this.setState({
                                    points: [...this.state.points].sort((p1, p2) => {
                                        return p1.x > p2.x ? 1 : -1
                                    })
                                })
                            }}
                        />
        let addButton = <RaisedButton label="Додати точку"
                            secondary={true}
                            containerElement="label"
                            onTouchTap={() => this.setState({
                                points: [...this.state.points, {x: 0, y: 0}]}
                            )}
                        />

        let x_vals_tds = this.state.points.map((val, i) => 
        <td>
            <span
                class="delete_td_popup"
                onClick={() => {
                    let copy = [...this.state.points]
                    copy.splice(i, 1)
                    this.setState({points: copy})
                }}
            >X</span>
            <TextField
                value={val.x}
                onChange={(e) => {
                    val.x = e.target.value
                    this.forceUpdate()
                }}
                style={{width: '50px'}}
            />
        </td>)
        let y_vals_tds = this.state.points.map((val, i) =>
            <td>
                <span
                    class="delete_td_popup"
                    onClick={() => {
                        let copy = [...this.state.points]
                        copy.splice(i, 1)
                        this.setState({points: copy})
                    }}
                >X</span>
                <TextField
                    value={val.y}
                    onChange={(e) => {
                        val.y = e.target.value
                        this.forceUpdate()
                    }}
                    style={{width: '50px'}}
                />
            </td>)

        x_vals_tds.push(sortButton)
        y_vals_tds.push(addButton)
        let separateXTds = chunk(x_vals_tds, 10)
        let separateYTds = chunk(y_vals_tds, 10)

        let tables = separateXTds.map((xTds, i) =>
            <div>
                <table class="discrete_table">
                    <tr>
                        <td>X</td>
                        {xTds}
                    </tr>
                    <tr>
                        <td>Y</td>
                        {separateYTds[i]}
                    </tr>
                </table>
                <br />
            </div>
        )

        return (
            <div class="form">

                <TextField
                    floatingLabelText="Степінь"
                    type="number"
                    defaultValue={this.props.formData.deg}
                    onChange={(e) => this.props.formData.deg = e.target.value}
                />
                {tables}
                <br/> 
                
                <RaisedButton label="Завантажити CSV"
                    secondary={true}
                    containerElement="label"
                ><input
                    class="file_input"
                    type="file"
                    onChange={this.onFileUpload} />
                </RaisedButton>

                <RaisedButton label="Завантажити Excel"
                    secondary={true}
                    containerElement="label"
                ><input
                    class="file_input"
                    type="file"
                    onChange={this.onExcelUpload} />
                </RaisedButton>

                <SelectField
                    value={this.state.X}
                    floatingLabelText="X"
                    floatingLabelFixed={true}
                    hintText="X"
                    onChange={(e, i, val) => {
                        if (this.state.Y) {
                            this.setState({
                                points: this.state.excelTableInJson.map(r => 
                                    ({x: r[val], y: r[this.state.Y]})),
                                X: val
                            })
                        } else this.setState({X: val})
                    }}
                >
                    {this.state.excelTableHeaders.map((h, i) => 
                        <MenuItem
                            key={i}
                            value={h}
                            primaryText={h}
                        />,
                    )}
                </SelectField>
                <SelectField
                    value={this.state.Y}
                    floatingLabelText="Y"
                    floatingLabelFixed={true}
                    hintText="Y"

                    onChange={(e, i, val) => {
                        if (this.state.X) {
                            this.setState({
                                points: this.state.excelTableInJson.map(r => 
                                    ({x: r[this.state.X], y: r[val]})),
                                Y: val
                            })
                        } else this.setState({Y: val})
                    }}
                >
                    {this.state.excelTableHeaders.map((h, i) => 
                        <MenuItem
                            key={i}
                            value={h}
                            primaryText={h}
                        />,
                    )}
                </SelectField>

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