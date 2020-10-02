import { tokenCounter, errorTokenCounter } from './var/global.js'
import { splitCode } from './split.js'
import { functionHandler } from './matchers/function.js'
import { operationHandler } from './matchers/operations.js'
import { delimiterHandler } from './matchers/delimiter.js'
import { whileHandler } from './matchers/while.js'
import Context from './classes/context.js'
import { TokenError } from './classes/token.js'
import { register } from './recorder/index.js'


/**
 * @description Divide un string en lineas para validar con expresiones regulares y obtener los tokens
 * @param {string} code Texto a validar
 * @return {[tokenFile]}  Lista de lexemas en el orden en que se muetra en el texto de entrada
 * @return {[tokens]}  Lista de tokens de lexemas unicos
 */

function compile(code) {
    //Contexto y manejadores
    let context = new Context()
    const funcHandler = functionHandler(context)
    const whiHandler = whileHandler(context)
    const opHandler = operationHandler(context)
    const delHandler = delimiterHandler(context)
    const chooseLineHandler = initializeLineHandler(context, funcHandler, whiHandler, opHandler, delHandler)
    //Tablas y archivos de token
    let tokens = [], errors = [], tokenFile = ''
    let counter = Object.assign({}, tokenCounter)
    let errorCounter = Object.assign({}, errorTokenCounter)
    const registerToken = register(tokens, errors, tokenFile, counter, errorCounter)

    //Separación
    const { splittedCode, lineTypes } = splitCode(code)
    for (const lineKey in lineTypes){
        //Manejo
        const handler = chooseLineHandler(lineTypes[lineKey])
        for (const lexemKey in splittedCode[lineKey]){
            const token = handler(splittedCode[lineKey][lexemKey])
            if (token instanceof TokenError) token.lineNumber = (parseInt(lineKey) + 1)
            //Registro
            const isLast = (parseInt(lexemKey)+1) === splittedCode[lineKey].length
            tokenFile = registerToken(token, isLast)
        }
    }
    console.log({ tokens, errors, tokenFile });
    return { tokens, errors, tokenFile }
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
                //context.addNewScope()
                context.blockJustOpened = true
                context.expectedTokens = ['TDF']
                context.functionPlace = 'outside'
                return fnHandler
            case 'while':
                context.blockJustOpened = true
                context.expectedTokens = ['WHILE']
                context.operationPlace = null
                return whHandler
            case 'operation':
                context.expectedTokens = ['ID', 'TDV'] //MUY IMPORTANTE EL ORDEN DEL ARRAY
                context.operationPlace = null
                return opHandler
            case 'delimiter':
                if (context.blockJustOpened){
                    context.expectedTokens = ['DELBO']
                    context.blockJustOpened = false
                }
                else context.expectedTokens = ['DELBE']
                return delHandler
            default:
                throw new Error('Tipo de línea desconocida')
        }
    }
}

export {
    compile
}