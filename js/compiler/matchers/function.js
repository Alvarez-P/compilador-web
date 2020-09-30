import { TokenError } from '../classes/token.js'
import { matcherLexeme } from './index.js'

/**
 * 
 * @param {Object} C Objeto que guarda la información del contexto en el que se encuentra el análisis
 * @returns {Function} Función que dada un toke
 */
const functionHandler = (context) => {
    return (lexeme) => {
        let token = null
        //Análisis sintáctico
        token = matcherLexeme(lexeme, context)
        if (!(token instanceof TokenError)){
            // Si el token era el esperado se hace el análisis semántico
            if(token.token==='ID'){
                if (context.functionPlace==='onSignature'){
                    const dtype = context.findVariable(token.lexeme)
                    if (dtype){
                        const desc = 'No se puede redefinir la variable. El shadowing no está permitido'
                        token = new TokenError(token.token, token.lexeme, 'semantic', context.numberLine, desc)
                    } else {
                        if (context.lastToken instanceof TokenError){
                            const desc = 'Identificador no posee un tipo de dato definido'
                            token = new TokenError(token.token, token.lexeme, 'semantic', null, desc)
                        } else {
                            token.dataType = context.lastToken.lexeme
                            context.addNewVariable(token)
                        }
                    }
                }
            }
        }
        //Cambia el operationPlace
        if (context.expectedTokens.includes('DELSO')) {
            context.functionPlace = 'onSignature'
            context.addNewScope()
        }

        //Cambia el siguiente token esperado
        // Muy importante la primera línea
        // BUG: Todo el analisis falla si el tipo de token esperado incluye un 'DELSE' y no se recibió ')'
        if(context.expectedTokens.includes('DELSE') && token.token==='DELSE') context.expectedTokens = ['DELBO']
        else if(context.expectedTokens.includes('TDF') || context.expectedTokens.includes('TDV')) context.expectedTokens = ['ID']
        else if(context.expectedTokens.includes('ID')){
            if (context.functionPlace==='onSignature') context.expectedTokens = ['SEP', 'DELSE']
            else context.expectedTokens = ['DELSO']
        }
        else if (context.expectedTokens.includes('DELSO')) context.expectedTokens = ['TDV', 'DELSE']      
        else if (context.expectedTokens.includes('SEP')) context.expectedTokens = ['TDV']

        context.lastToken = token // Muy importante
        return token
    }
}
export {
    functionHandler
}