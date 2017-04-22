import MathJax from 'react-mathjax';
import React from 'react';

export default function(props) {
    return (
        <MathJax.Context>
            <MathJax.Node inline>{props.formula}</MathJax.Node>
        </MathJax.Context>
    );
}