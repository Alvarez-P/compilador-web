import { TokenError } from '../classes/token.js'
import { matcherLexeme } from '../matchers/index.js'


const whileHandler = (context) => {
    return (lexeme) => {
        let token = null
        // An. sintacico
        token = matcherLexeme(lexeme, context)
        //Muy importante esta condicion, NO es igual a if(token instanceof Token)
        if (!token instanceof TokenError){
            if (!['ID'].includes(token.token)) { // Solo analiza ID
                // An. semántico
                switch(token.token){
                    case 'ID':
                        const prevToken = contex.findVariable(token.lexeme)
                        if (!prevToken){
                            const desc = 'Indefinida la variable'
                            token = new TokenError(token.token, token.lexeme, null, null, desc)
                        } else if (context.onOperation){
                            const opDataType = context.operationDataType
                            if (opDataType!=='any' && opDataType!==prevToken.dataType){
                                const desc = 'Incompatibilidad de tipos'
                                token = new TokenError(token.token, token.lexeme, null, null, desc)
                            }
                        }
                        break
                }
            }
        }
        //Cambiar estado del context
        if (context.expectedTokens.includes('ID') && context.onOperation) context.onOperation = false
        if (context.expectedTokens.includes('OA') && token.token!=='DELSE') {
            const dtype = context.lastToken.dataType
            if (!dtype) context.operationDataType = 'any'
            else context.operationDataType = dtype
        }

        //Cambiar token esperado
        if (context.expectedTokens.includes('WHILE')) context.expectedTokens = ['DELSO']
        else if (context.expectedTokens.includes('DELSO')) context.expectedTokens = ['ID', 'DELSE']
        //BUG: Si el token esperado era DELSE y recibe "))" o similar, todo el analisis falla.
        else if (context.expectedTokens.includes('DELSE') && token.token ==='DELSE') context.expectedTokens = ['DELBO']
        else if (context.expectedTokens.includes('ID')) context.expectedTokens = ['OA', 'DELSE']
        else if (context.expectedTokens.includes('OA')) context.expectedTokens = ['ID']

        //Retornar
        context.lastToken = token
        return token
    }
}

export {
    whileHandler
}