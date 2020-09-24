import { matcherLexeme } from './'

/**
 * @function delimiterHandler
 * @description
 * @param {Object} context Objeto que guarda la información del contexto en el que se encuentra el análisis
 * @returns {Function} Función que dado un token
*/
const delimiterHandler = (context) => {
    return (lexeme) => {
        let token = null
        // Análisis sintáctico
        token = matcherLexeme(lexeme, context) 
        if (!(token instanceof TokenError)){
            // Si el token era el esperado se hace el análisis semántico
            context.deleteLastScope()
        }
        return token
    }
}
export {
    delimiterHandler
}