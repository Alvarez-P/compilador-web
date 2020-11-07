import { infixToPrefix, getPrefixLexemes } from '../compiler/prefix/prefixParsing.js'

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

const op2 = [
    'y',
    '>',
    '6',
    '&&',
    'x',
    '==',
    '9',
    '||',
    'z',
    '<=',
    '9'
]

const tokens = op2.map(lexeme =>{ return { lexeme }})

const prefix = infixToPrefix(tokens)

console.log(prefix)
console.log(getPrefixLexemes(prefix))
