import { matcherLexeme } from './index.js'
import { TokenError } from '../classes/token.js'
/**
 * @function operationHandler
 * @description
 * @param {Object} context Objeto que guarda la información del contexto en el que se encuentra el análisis
 * @returns {Function} Función que dado un token
*/
const operationHandler = (context) => (lexeme) => {
    // Análisis sintáctico
    let token = matcherLexeme(lexeme, context)
    if (!(token instanceof TokenError)) {
        // Si el token era el esperado se hace el análisis semántico
        if (token.token === 'ID') {
            const prevDType = context.findVariable(token.lexeme)
            token.dataType = prevDType || 'any'
            switch (context.operationPlace) {
                case 'onAsignation':
                    if(context.lastToken instanceof TokenError){
                        const desc = 'Identificador no posee un tipo de dato definido'
                        token = new TokenError(token.token, token.lexeme, null, context.lineNumber, 'semantic', desc)
                    }
                    else if (!prevDType && context.lastToken.lexeme) {
                        token.dataType = context.lastToken.lexeme
                        context.operationDataType = token.dataType
                        context.addNewVariable({ lexeme: token.lexeme, dataType: token.dataType })
                    } else if (!prevDType && !context.lastToken.lexeme) {
                        const desc = 'La variable no está definida'
                        token = new TokenError(token.token,token.lexeme, null, context.lineNumber, 'semantic', desc)
                    } else {
                        const desc = 'La variable ya está definida'
                        token = new TokenError(token.token, token.lexeme, null, context.lineNumber, 'semantic', desc)
                    }
                    break;
                case 'onOperation':
                    if (!prevDType) {
                        const desc = 'La variable no está definida'
                        token = new TokenError(token.token,token.lexeme, null, context.lineNumber, 'semantic', desc)
                    } else if (context.operationDataType === 'any') {
                        context.operationDataType = prevDType
                    } else if (context.operationDataType !== 'any' && prevDType !== context.operationDataType) {
                        const desc = `Tipo de dato inválido. Se esperaba un: ${context.operationDataType}`
                        token = new TokenError(token.token,token.lexeme, prevDType, context.lineNumber, 'semantic', desc)
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
                token = new TokenError(token.token, token.lexeme, dataType, context.lineNumber, 'semantic', desc)
            }
        }
        if (['OA'].includes(token.token)) {
            if ((context.operationDataType==='char' && token.token!=='+')|| context.operationDataType==='boolean') {
                const desc = `Operador inválido para el tipo de dato ${context.operationDataType}`
                token = new TokenError(token.token,token.lexeme, null, context.lineNumber, 'semantic', desc)
            }
        }
    }
    context.lastToken = token
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
    return token
}

export {
    operationHandler
}