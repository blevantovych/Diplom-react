import React, { Component } from 'react'
import Formula from './Formula'
import { Card, CardText } from 'material-ui/Card'

class History extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const history = this.props.history.map((item) =>
            <div style={{margin: '10px 0'}}>
                <Card onTouchTap={() => this.props.onItemClick(item.type)} style={{cursor: 'pointer'}}>
                    <CardText>
                        {item.date && <Formula formula={(new Date(item.date)).toLocaleString()} /> }
                        <h4>{item.type}</h4>
                    </CardText>
                </Card>
            </div>)
        return (
            <div>
                {history}
            </div>
        )
    }
}

export default History