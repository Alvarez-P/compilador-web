import { matcherLexeme } from './'

/**
 * @function operationHandler
 * @description
 * @param {Object} context Objeto que guarda la información del contexto en el que se encuentra el análisis
 * @returns {Function} Función que dado un token
*/
const operationHandler = (context) => {
    return (lexeme) => {
        let token = null
        //Análisis sintáctico
        token = matcherLexeme(lexeme, context) 
        if (!(token instanceof TokenError)){
            // Si el token era el esperado se hace el análisis semántico
            if(token.token==='ID'){
                if (context.operationPlace==='onAsignation'){
                    const prevId = context.findVariable(token.lexema)
                    if (!prevId && context.lastToken.lexeme){
                        token.dataType = context.lastToken.lexeme
                        context.operationDataType = token.dataType
                        context.addNewVariable({lexeme: token.lexeme, dataType: token.dataType})
                    } else if(!prevId && !context.lastToken.lexeme) {
                        token.dataType = 'any'
                        context.operationDataType = token.dataType
                        context.addNewVariable({lexeme: token.lexeme, dataType: token.dataType})
                    } else {
                        const desc = 'No se puede redefinir la variable. El shadowing no está permitido'
                        token = new TokenError(token.token, token.lexeme, context.lastToken.lexeme, context.numberLine, desc)
                    }
                }
                if (context.operationPlace==='onOperation') {
                    const prevId = context.findVariable(token.lexema)
                    if (!prevId){
                        const desc = 'Indefinido'
                        token = new TokenError(token.token, token.lexeme, null, context.numberLine, desc)
                    } else if(context.operationDataType === 'any') {
                        context.operationDataType = prevId
                    } else if(context.operationDataType !== 'any' && prevId !== context.operationDataType) {
                        const desc = `Tipo de dato inválido: se esperaba un ${context.operationDataType}`
                        token = new TokenError(token.token, token.lexeme, prevId, context.numberLine, desc)
                    }
                }
            }
            if(['CNE', 'CNPF'].includes(token.token)){
                const dataType = token.token === 'CNE'? 'int' : 'double'
                if (context.operationDataType==='any') {
                    context.operationDataType = dataType
                } else if(context.operationDataType !== dataType) {
                    const desc = `Tipo de dato inválido: se esperaba un ${context.operationDataType}`
                    token = new TokenError(token.token, token.lexeme, prevId, context.numberLine, desc)
                }
            }
            if(token.token==='OA'){
                const desc = `Operador inválido para el tipo de dato ${context.operationDataType}`
                if ((context.operationDataType==='char' && ['*','-','%','/'].includes(token.token)) || context.operationDataType==='boolean') {
                    token = new TokenError(token.token, token.lexeme, prevId, context.numberLine, desc)
                }
            }
        }
        //Cambia el siguiente token esperado
        if(context.expectedTokens.includes('TDV')) context.expectedTokens = ['ID']
        if(context.expectedTokens.includes('ID')){
            if (context.functionPlace==='onAsignation') context.expectedTokens = ['AS']
            else context.expectedTokens = ['OA']
        }
        return token
    }
}
export {
    operationHandler
}