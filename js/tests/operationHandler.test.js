// Tests Operation Handler
import Context from '../compiler/classes/context.js'
import { operationHandler } from '../compiler/matchers/operations.js'
//import { scopes } from "./index.js";

const codeLines = [
    ['a', '=', 'b', '-', 'd'],
    ['b', '=', 'd', '+', '2'],
    ['int', 'variable', '=', 'a', '+', 'b', '-', '23']
]

const scopes = [
    [
        { token: 'ID', lexeme: 'a', dataType: 'int' },
        { token: 'ID', lexeme: 'b', dataType: 'int' }
    ],
    [
        { token: 'ID', lexeme: 'a', dataType: 'int' },
        { token: 'ID', lexeme: 'b', dataType: 'int' },
        { token: 'ID', lexeme: 'c', dataType: 'boolean' },
        { token: 'ID', lexeme: 'd', dataType: 'char' }
    ],
    [
        { token: 'ID', lexeme: 'a', dataType: 'int' },
        { token: 'ID', lexeme: 'b', dataType: 'boolean' }
    ],
]

const contexts = scopes.map(scope => {
    let c = new Context()
    c.scope = [scope]
    c.expectedTokens = ['ID', 'TDV'] //MUY IMPORTANTE EL ORDEN DEL ARRAY
    return c
})

const handlers = contexts.map(context => {
    const handler = operationHandler(context)
    return handler
})

const showContext = ({ expectedTokens }) => expectedTokens

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

/*
const test = () => {
    for (const key in codeLines) {
        const line = codeLines[key]
        let context = new Context()
        context.scope = [scopes[key]]
        context.expectedTokens = ['ID', 'TDV']
        context.operationPlace = 'onAsignation'
        context.lineNumber = parseInt(key)
        // Se agrega un scope para comprobar que se pueden declarar una misma variable, en diferentes scopes
        context.addNewScope()
        console.log(`RESULT # ${key}`)
        for (const key in line){
            const result = operationHandler({ context, lexeme: line[key] })
            context = result.context
            console.log(result.token)
        }
        console.log(context.expectedTokens)
    }
}

test()*/