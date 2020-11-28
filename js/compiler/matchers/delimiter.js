import { matcherLexeme } from './index.js'
import { TokenError } from '../classes/token.js'

/**
 * @function delimiterHandler
 * @description
 * @param {Object} context Objeto que guarda la información del contexto en el que se encuentra el análisis
 * @returns {Function} Función que dado un token
*/
const delimiterHandler = (context) => {
    return (lexeme) => {
        // Análisis sintáctico
        const token = matcherLexeme(lexeme, context) 
        if (!(token instanceof TokenError)){
            context.isOpenWhile = true
            // Si el token era el esperado se hace el análisis semántico
            if (token.token==='DELBE') {
                context.isOpenWhile = false
                context.deleteLastScope()
            }
        }
        return token
    }
}
export {
    delimiterHandler
}