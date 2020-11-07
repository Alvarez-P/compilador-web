import triple from '../compiler/triple/index.js'

const mocks = [
    [
        {
            prefixLine: ["||","<", "y", "x","==", "x", "9"],
            type: 'while'
        },
        {
            prefixLine: ['=', 'y', '+', 'y', '1'],
            type: 'operation'
        },
        {
            prefixLine: ['}'],
            type: 'whileEnd'
        }
    ]
]

const tests = () => {
    mocks.forEach(line => {
        console.log(triple(line))
    })
}

tests(mocks)