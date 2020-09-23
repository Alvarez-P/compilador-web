import { TokenError } from '../classes/token.js'
import { matcherLexeme } from '../matchers/index.js'

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
        if (token instanceof Token){
            // Si el token era el esperado se hace el análisis semántico
            if(token.token==='ID'){
                if (context.functionPlace==='onSignature'){
                    const prevId = context.findVariable(token.lexema)
                    if (prevId){
                        const desc = 'No se puede redefinir la variable. El shadowing no está permitido'
                        token = new TokenError(token.token, token.lexeme, context.lastToken.lexeme, context.numberLine, desc)
                    } else {
                        token.dataType = context.lastToken.lexeme
                        context.addNewVariable(token)
                    }
                }
            }
        }
        //Cambia el siguiente token esperado
        if(context.expectedTokens.includes('TDF') || context.expectedTokens.includes('TDV')) context.expectedTokens = ['ID']
        if(context.expectedTokens.includes('ID')){
            if (context.functionPlace==='onSignature') context.expectedTokens = ['SEP', 'DELSE']
            else context.expectedTokens = ['DELSO']
        }
        //Nota: Hay un bug si el tipo de token esperado era ['SEP','DELFO'] y no se recibió
        if(token.token==='SEP') context.expectedTokens = ['TDV']
        if(token.token==='DELSE') context.expectedTokens = ['DELFO']
        return token
    }
}
export {
    functionHandler
}