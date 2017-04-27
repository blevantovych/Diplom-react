import React, { Component } from 'react';
import Rebase from 're-base'

import Formula from './Formula'
import { Card, CardText } from 'material-ui/Card';


class History extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const history = this.props.history.map((item) =>
            <div style={{margin: '10px 0'}}>
                <Card>
                    <CardText><Formula formula={item.id} /></CardText>
                </Card>
            </div>)
        // console.log(this.prop);
        return (
            <div>

                {history}
                
            </div>
        );
    }
}

export default History;