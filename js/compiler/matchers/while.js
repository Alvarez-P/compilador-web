import { TokenError } from '../classes/token.js'
import { matcherLexeme } from './index.js/index.js'


const whileHandler = (context) => {
    return (lexeme) => {
        let token = null
        // An. sintacico
        token = matcherLexeme(lexeme, context)
        //Muy importante esta condicion, NO es igual a if(token instanceof Token)
        if (!(token instanceof TokenError)){
            switch(token.token){
                case 'ID':
                    const tokenDType = context.findVariable(token.lexeme)
                    if (!tokenDType){
                        const desc = 'Indefinida la variable'
                        token = new TokenError(token.token, token.lexeme, 'semantic', null, desc)
                    } else if (context.operationPlace==='onOperation'){
                        //Si hay operacion, busca tipo del token actual y comparalo con tipo de operacion
                        const opDataType = context.operationDataType
                        if (opDataType!=='any' && opDataType!==tokenDType){
                            const desc = 'Incompatibilidad de tipos'
                            token = new TokenError(token.token, token.lexeme, 'semantic', null, desc)
                        }
                    }
                    break
            }
        }
        //Cambiar estado de context
        if (context.expectedTokens.includes('ID') && context.operationPlace==='onOperation') context.operationPlace = null
        if (context.expectedTokens.includes('OA') && token.token!=='DELSE') {
            //Activa la operacion, busca en scope el ultimo lexema de ID y lo asigna como tipo de dato de operacion
            const lastLexeme = context.lastToken.lexeme
            const dtype = context.findVariable(lastLexeme)
            context.operationPlace = 'onOperation'
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