import { matcherLexeme } from './index.js'
import { TokenError } from '../classes/token.js'
/**
 * @function operationHandler
 * @description
 * @param {Object} context Objeto que guarda la información del contexto en el que se encuentra el análisis
 * @returns {Function} Función que dado un token
*/
const operationHandler = (context) => {
    return (lexeme) => {
        let token = null
        // Análisis sintáctico
        token = matcherLexeme(lexeme, context)
        if (!(token instanceof TokenError)) {
            //Análisis semántico
            switch(token.token){
                case 'ID':
                    if (context.operationPlace==='onDeclaration') {
                        //Comprueba si la variable es precedida por un TD
                        const prevDType = context.lastToken.lexeme
                        if (prevDType && prevDType!=='any'){
                            //Comprueba si la variable ya estaba definida
                            const dtype = context.findVariable(token.lexeme)
                            if (dtype){ 
                                const desc = 'No se puede redefinir la variable. No se acepta el shadowing.'
                                token = new TokenError(token.token, token.lexeme, null, null, 'semantic', desc)
                            } else {
                                //Registra la variable en el scope
                                token.dataType = prevDType
                                context.addNewVariable(token)
                            }
                        } else {
                            const desc = 'Se desconoce el tipo de dato de la variable'
                            token = new TokenError(token.token, token.lexeme, null, null, 'semantic', desc)
                        }
                    } else if (context.operationPlace==='onOperation') {
                        const tokenDType = context.findVariable(token.lexeme)
                        if (tokenDType){ //Comprueba si la variable está definida
                            const opDataType = context.operationDataType
                            if (opDataType!=='any' && opDataType!==tokenDType){ //Comprueba si los tipos de dato no coinciden
                                const desc = `Incompatibilidad de tipos`
                                token = new TokenError(token.token, token.lexeme, null, null, 'semantic', desc)
                            }
                        } else{
                            const desc = 'Indefinida la variable'
                            token = new TokenError(token.token, token.lexeme, null, null, 'semantic', desc)
                        }
                    } else {// Para lexemas "a" en "a = b * c". Comprueba que existe en scope
                    const tokenDType = context.findVariable(token.lexeme)
                        if (!tokenDType){
                            const desc = 'Indefinida la variable'
                            token = new TokenError(token.token, token.lexeme, null, null, 'semantic', desc)
                        }
                    }
                    break
            }
            if (['CNE', 'CNPF'].includes(token.token)){
                if (context.operationPlace==='onOperation'){
                    token.dataType = token.token==='CNE'?'int':'double'
                        if (context.operationDataType!=='any' && context.operationDataType!==token.dataType){
                            const desc = `Tipo de dato inválido. Se esperaba un: ${context.operationDataType}`
                            token = new TokenError(token.token, token.lexeme, token.token, null, 'semantic', desc)
                        }
                }
            }
        }
        //Actualizacion del estado de Context
        if(context.expectedTokens.includes('TDV') && token.token==='TDV') context.operationPlace = 'onDeclaration'
        else if (context.expectedTokens.includes('OA') || context.expectedTokens.includes('AS')){
            //Salva tipo de dato de operando izquierdo en caso de operación o asignación
            const lastLexeme = context.lastToken.lexeme
            const dtype = context.findVariable(lastLexeme)
            context.operationPlace = 'onOperation'
            if (!dtype) context.operationDataType = 'any'
            else context.operationDataType = dtype
        }

        //Actualizacion del seg. tipo de token esperado
        //NOTA: Hay un bug si se quier declarar una vairble pero se ecribe el TD mal
        if(context.expectedTokens.includes('TDV') && token.token==='TDV') context.expectedTokens = ['ID']
        else if (context.expectedTokens.includes('ID')){
            if (context.operationPlace==='onDeclaration') context.expectedTokens = ['AS']
            else context.expectedTokens = ['AS', 'OA']
        }
        else if (context.expectedTokens.includes('CNE') || context.expectedTokens.includes['CNFP']) context.expectedTokens = ['OA']
        else if (context.expectedTokens.includes('OA') || context.expectedTokens.includes('AS')) context.expectedTokens = ['ID', 'CNE', 'CNPF']

        context.lastToken = token
        return token
    }
}

export {
    operationHandler
}