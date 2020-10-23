import { infixToPrefix, getPrefixLexemes } from '../compiler/prefix.js'

const op1 = [
    'int',
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

const tokens = op1.map(lexeme => { return {lexeme: lexeme} })

const prefix = infixToPrefix(tokens)

console.log(prefix)
console.log(getPrefixLexemes(prefix))
