import Context from '../compiler/classes/context.js'
import { delimiterHandler } from '../compiler/matchers/delimiter.js'

const codeLines = [ ['{'], ['}'], ['{'], ['}'] ]

const scopes = [
    [
        { token: 'ID', lexeme: 'just', dataType: 'int' },
        { token: 'ID', lexeme: 'open', dataType: 'int' }
    ],
    [
        { token: 'ID', lexeme: 'closed', dataType: 'int' },
        { token: 'ID', lexeme: 'd', dataType: 'char' }
    ],
    [
        { token: 'ID', lexeme: 'should be closed', dataType: 'int' },
        { token: 'ID', lexeme: 'Theres an error', dataType: 'boolean' }
    ],
    [
        { token: 'ID', lexeme: 'should NOT be closed', dataType: 'int' },
        { token: 'ID', lexeme: 'Theres an error', dataType: 'boolean' }
    ]
]

const expected = [true, false, false, true]

const contexts = scopes.map(scope => {
    let c = new Context()
    if (scope) c.scope = [scope]
    return c
})

for (const key in expected) {
    if (expected[key]){
        contexts[key].blockJustOpened = true
        contexts[key].expectedTokens = ['DELBO']
    } else {
        contexts[key].blockJustOpened = false
        contexts[key].expectedTokens = ['DELBE']
    }
}

const handlers = contexts.map(context => {
    const handler = delimiterHandler(context)
    return handler
})

const showContext = ({ scope }) => scope

function test(){
    const results = []
    for(let key = 0; key < codeLines.length; key++){
        const line = codeLines[key], handler = handlers[key]

        const result = []
        for (const lexeme of line){
            result.push(handler(lexeme))
        }
        results.push(result)
    }

    for(const key in results){
        console.log(`RESULT # ${key}`)
        console.log(results[key])
        console.log(showContext(contexts[key]))
    }
}

test()
