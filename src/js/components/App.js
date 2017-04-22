import React from 'react';
import IterationList from './IterationList'
import './main.scss'

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <IterationList />
        );
    }
}

