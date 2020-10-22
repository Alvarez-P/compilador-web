import { infixToPrefix } from '../compiler/prefix.js'

const op1 = [
    'res',
    '=',
    '(',
    'x',
    '+',
    'z',
    ')',
    '*',
    'w',
    '/',
    't',
    '^',
    'y',
    '-',
    'v'
]
const tokens = []

op1.map((lexeme => {
    tokens.push({lexeme: lexeme})
}))

console.log(infixToPrefix(tokens))
