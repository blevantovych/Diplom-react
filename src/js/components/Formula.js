import MathJax from 'react-mathjax';
import React from 'react';

export default function(props) {
    return (
        <div class="formula">
            <MathJax.Context>
                <MathJax.Node inline>{props.formula}</MathJax.Node>
            </MathJax.Context>
        </div>
    );
}