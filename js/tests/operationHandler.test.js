// Tests Operation Handler
import Context from '../compiler/classes/context.js'
import { operationHandler } from '../compiler/matchers/operations.js'
import { scopes } from "./index.js";

const codeLines = [
    ['a', '=', 'b', '-', 'd'],
    ['b', '=', 'd', '+', '2'],
    ['int', 'variable', '0', 'a', '+', 'b', '-', '23']
]

function test(){
    for(const key in codeLines){
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

test()