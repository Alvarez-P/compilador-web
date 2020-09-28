//TESTEANDO WHILE HANDLER
import Context from '../compiler/classes/context.js'
import { whileHandler } from '../compiler/matchers/while.js'

//while (a < b)
//while (a <= b && a <= c)

const codeLines = [
    ['while', '(', 'a', '<', 'b', ')'],
    ['while', '(', 'a', '||', 'b', '&&', 'a', '<=', 'c', ')']
]
const scopes = [
    [
        { token: 'ID', lexeme: 'a', dataType: 'int' },
        { token: 'ID', lexeme: 'b', dataType: 'int' }
    ],
    [
        { token: 'ID', lexeme: 'a', dataType: 'int' },
        { token: 'ID', lexeme: 'b', dataType: 'int' },
        { token: 'ID', lexeme: 'c', dataType: 'int' }
    ]
]

const contexts = scopes.map(scope => {
    let c = new Context()
    //Initialize context for while
    c.scope = [scope]
    c.expectedTokens = ['WHILE']
    return c
})

const handlers = contexts.map(context => {
    const handler = whileHandler(context)
    return handler
})

function showContext(context){
    return {
        expectedTokens: context.expectedTokens
    }
}

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