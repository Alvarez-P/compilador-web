import { tokenCounter, errorTokenCounter } from './var/global.js'
import { splitCode } from './split.js'
import { functionHandler } from './matchers/handlers.js/index.js'
import { operationHandler } from './matchers/operations.js'
import { delimiterHandler } from './matchers/delimiter.js'
import { whileHandler } from './matchers/while.js'
import Context from './classes/context.js'
import { TokenError } from './classes/token.js'
import register from './recorder/index.js'

let context = Context()
const funcHandler = functionHandler(context)
const whiHandler = whileHandler(context)
const opHandler = operationHandler(context)
const delHandler = delimiterHandler(context)
const chooseLineHandler = initializeLineHandler(context, funcHandler, whiHandler, opHandler, delHandler)

/**
 * @description Divide un string en lineas para validar con expresiones regulares y obtener los tokens
 * @param {string} code Texto a validar
 * @return {[tokenFile]}  Lista de lexemas en el orden en que se muetra en el texto de entrada
 * @return {[tokens]}  Lista de tokens de lexemas unicos
 */

function compile(code) {
    let tokens = [], errors = [], tokenFile = ''
    let counter = Object.assign({}, tokenCounter)
    let errorCounter = Object.assign({}, errorTokenCounter)
    const registerToken = register(tokens, errors, tokenFile, counter, errorCounter)

    const { splittedCode, lineTypes } = splitCode(code)
    for (key of lineTypes){
        if (context.blockJustOpened) context.blockJustOpened = false
        const handler = chooseLineHandler(lineTypes[key])
        for (lexem of splittedCode[key]){
            const token = handler(lexem)
            if (token instanceof TokenError) token.line = key
            registerToken(token)
        }
    }
    //console.log('Tokens', tokens)
    //console.log('Errores', errors)
    return { tokens, errors, tokenFile }
}

export {
    compile
}

/**
 * @description Devuelve la función usada para analizar lexemas para un 
 * tipo de línea determinado. Inicializa parámetros en context basado
 * también en el tipo de línea a analizar.
 * @param {*} context 
 * @param {*} fnHandler 
 * @param {*} whHandler 
 * @param {*} opHandler 
 * @param {*} delHandler 
 * @returns {Function} Función que devulve una función usada para analizar
 * lexemas de un tipo de línea determinado.
 */
function initializeLineHandler(context, fnHandler, whHandler, opHandler, delHandler){
    return function(lineType){
        switch(lineType){
            case 'function':
                context.addNewScope()
                context.blockJustOpened = true
                context.expectedTokens = ['TDF']
                return fnHandler
            case 'while':
                context.blockJustOpened = true
                context.expectedTokens = ['IT']
                return whHandler
            case 'operation':
                context.expectedTokens = ['ID']
                return opHandler
            case 'delimiter':
                if (context.blockJustOpened) context.expectedTokens = ['DELBO']
                else context.expectedTokens = ['DELBE']
                return delHandler
            default:
                throw new Error('Tipo de línea desconocida')
        }
    }
}