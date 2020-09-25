import { Token, TokenError } from '../classes/token'
import { matcherLexeme } from '../matchers/index'


const whileHandler = (context) => {
    return (lexeme) => {
        let token = null
        // An. sintacico
        token = matcherLexeme(lexeme)
        //Muy importante esta condicion, NO es igual a if(token instanceof Token)
        if (!token instanceof TokenError){
            if (!['ID', 'OP'].includes(token.token)) { // Solo analiza ID y OP
                // An. semántico
                switch(token.token){ // BUG: Falta regex para while
                    case 'ID':
                        //If exists in scope, keep. If no, check if operation is active. If yes, deactivate it
                        //If exist
                        break
                    case 'OP':
                        break
                }
            }
        }

        //Cambiar token esperado
        if (context.expectedToken.includes('WHILE')) context.setExpectedToken(['DELSO'])
        else if (context.expectedToken.includes('DELSO')) context.setExpectedToken(['ID', 'DELSE'])
        //BUG: Si el token esperado era DELSE y recibe "))" o similar, todo el analisis falla.
        else if (context.expectedToken.includes('DELSE') && token.token ==='DELSE') context.setExpectedToken(['DELBO'])
        else if (context.expectedToken.includes('ID')) context.setExpectedToken(['OP', 'DELSE'])
        else if (context.expectedToken.includes('OP')) context.setExpectedToken(['ID'])

        //Retornar
        return token
    }
}

export {
    whileHandler
}