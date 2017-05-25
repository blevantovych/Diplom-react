let formsStates = {
    minmax: {
        disabled: false,
        func: 'ln(x)',
        deg: 1,
        start: 1,
        end: 3,
        presicion: 0.01,
        points: 10
    },
    lssq: {
        disabled: false,
        func: 'ln(x)',
        deg: 1,
        start: 1,
        end: 3,
        presicion: 0.01,
        points: 10
    },
    lssq_discrete: {
        disabled: false,
        points: [{x:0, y:0}],
        deg: 1
    },
    comp: {
        disabled: false,
        func: 'ln(x)',
        deg: 1,
        start: 1,
        end: 3,
        presicion: 0.01,
        points: 10
    },
    minmax_discrete: {
        disabled: false,
        points: [{x:0, y:0}],
        deg: 1
    },
    compare_discrete: {
        disabled: false,
        points: [{x:0, y:0}],
        deg: 1
    }
}

export default formsStates