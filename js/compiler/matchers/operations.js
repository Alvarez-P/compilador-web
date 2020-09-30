import { matcherLexeme } from './index.js'
import { TokenError } from '../classes/token.js'
/**
 * @function operationHandler
 * @description
 * @param {Object} context Objeto que guarda la información del contexto en el que se encuentra el análisis
 * @returns {Function} Función que dado un token
*/
const operationHandler = ({ context, lexeme }) => {
    let token = null
    // Análisis sintáctico
    token = matcherLexeme(lexeme, context)
    if (!(token instanceof TokenError)) {
        // Si el token era el esperado se hace el análisis semántico
        if (token.token === 'ID') {
            const prevId = context.findVariable(token.lexeme)
            token.dataType = prevId || 'any'
            switch (context.operationPlace) {
                case 'onAsignation':
                    // La variable no existe y hay un tipo de dato antes
                    if(context.lastToken instanceof TokenError){
                        const desc = 'Identificador no posee un tipo de dato definido'
                        token = new TokenError(token.token, token.lexeme, null, 'semantic', desc)
                    }
                    else if (!prevId && context.lastToken.lexeme) {
                        token.dataType = context.lastToken.lexeme
                        context.operationDataType = token.dataType
                        context.addNewVariable({
                            lexeme: token.lexeme,
                            dataType: token.dataType,
                            token: token.token
                        })
                        // La variable no existe y no hay un tipo de dato antes
                    } else if (!prevId && !context.lastToken.lexeme) {
                        token.dataType = 'any'
                        context.operationDataType = token.dataType
                        context.addNewVariable({
                            lexeme: token.lexeme,
                            dataType: token.dataType,
                            token: token.token
                        })
                        // La variable ya esta declarada en el mismo scope
                    } else {
                        const desc = 'La variable ya está definida'
                        token = new TokenError(
                            token.token,
                            token.lexeme,
                            '',
                            context.lineNumber,
                            'semantic',
                            desc
                        )
                    }
                    break;
                case 'onOperation':
                    // La variable no ha sido declarada antes
                    if (!prevId) {
                        const desc = 'La variable no está definida'
                        token = new TokenError(
                            token.token,
                            token.lexeme,
                            '',
                            context.lineNumber,
                            'semantic',
                            desc
                        )
                        // La variable ya ha sido declarada y la operacion es de tipo any
                    } else if (context.operationDataType === 'any') {
                        context.operationDataType = prevId
                        // La variable ya ha sido declarada, la operacion no es de tipo any 
                        // y tampoco coincide con el tipo de la variable
                    } else if (context.operationDataType !== 'any' &&
                                prevId !== context.operationDataType) {
                        const desc = `Tipo de dato inválido. Se esperaba un: ${context.operationDataType}`
                        token = new TokenError(
                            token.token,
                            token.lexeme,
                            prevId,
                            'semantic',
                            context.lineNumber,
                            desc
                        )
                    }
                    break;
                default:
                    break;
            }
        }
        if (['CNE', 'CNPF'].includes(token.token)) {
            const dataType = token.token === 'CNE' ? 'int' : 'double'
            if (context.operationDataType === 'any') {
                context.operationDataType = dataType
            } else if (context.operationDataType !== dataType) {
                const desc = `Tipo de dato inválido. Se esperaba un: ${context.operationDataType}`
                token = new TokenError(
                    token.token,
                    token.lexeme,
                    dataType,
                    context.lineNumber,
                    'semantic',
                    desc
                )
            }
        }
        if (['OA'].includes(token.token)) {

            // Si tipo de operacion es char y el operador es dferente a suma 
            // ó el tipo de operacion es boolean
            if ((context.operationDataType === 'char' && token.token !== '+')
                || context.operationDataType === 'boolean') {
                const desc = `Operador inválido para el tipo de dato ${context.operationDataType}`
                token = new TokenError(
                    token.token,
                    token.lexeme,
                    '',
                    context.lineNumber,
                    'semantic',
                    desc
                )
            }
        }
    }
    context.lastToken = token
    // Cambia el siguiente token esperado
    if (context.expectedTokens.includes('TDV') && token.token !== 'ID') {
        context.expectedTokens = ['ID']
    }
    else if (context.expectedTokens.includes('ID')) {
        if (context.operationPlace === 'onAsignation') context.expectedTokens = ['AS']
        else context.expectedTokens = ['OA']
    }
    else if (context.expectedTokens.includes('AS')) {
        context.operationPlace = 'onOperation'
        context.expectedTokens = ['ID', 'CNE', 'CNPF']
    }
    else if (context.expectedTokens.includes('OA')) context.expectedTokens = ['ID', 'CNE', 'CNPF']
    return { token, context }
}

export {
    operationHandler
}