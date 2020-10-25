import triple from '../compiler/triple/index.js'

const mocks = [
    [
        {
            prefixLine: ['=', 'x', '-', '4', '2'],
            type: 'operation'
        },
        {
            prefixLine: ['=', 'y', '-', '8', '*', '6', '4'],
            type: 'operation'
        }
    ]
]

const tests = () => {
    mocks.forEach(line => {
        console.log(triple(line))
    })
}

tests(mocks)