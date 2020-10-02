import { TokenError } from "../classes/token.js"

const register = (tokens, errors, lexemes, tokenCounter, errorTokenCounter) => (token, isLastLexemeInLine) => {
    let existingToken = null
    //Compara lexemas y tokens para comprobar si está registrado
    if(!(token instanceof TokenError)){
        tokens.forEach(current => {
            if(current.lexeme === token.lexeme && current.prevToken === token.token && !current.description) existingToken = current
        })
    } else {
        tokens.forEach(current => {
            if(current.lexeme === token.lexeme &&
                 current.prevToken === token.token && 
                 current.description === token.description) {
                existingToken = current
                if (current.lineNumber && token.lineNumber && 
                    current.lineNumber.toString().indexOf(token.lineNumber) === -1 )
                current.lineNumber = `${current.lineNumber}, ${token.lineNumber}`
            }
        })
    }
    
    token.prevToken = token.token //MUY IMPORTANTE
    //Traducción de tipos específicos a tipos genéricos
    if (['TDV', 'TDF'].includes(token.token)) token.token = 'TD'
    if (['DELSO', 'DELSE', 'DELBO', 'DELBE'].includes(token.token)) token.token = 'DEL'
    if (['WHILE'].includes(token.token)) token.token = 'IT'
    //Compruba si es un token de error
    if (token.description && !existingToken) {
        if (token.errorType==='lexical'){
            const prevToken = token.token
            token.token = 'ERLX' + token.token + errorTokenCounter['ERLX'+token.token]
            errorTokenCounter['ERLX'+prevToken] ++
        } else {
            //NOTA: Find todos los semánticos
            token.token = 'ERSEM' + errorTokenCounter['SEM']
            errorTokenCounter['SEM'] ++
        }
        errors.push(token)
        tokens.push(token)
    } else if (!existingToken) {
        const prevToken = token.token
        token.token = token.token + tokenCounter[token.token]
        tokenCounter[prevToken] ++
        tokens.push(token)
    } else {
        token.token = existingToken.token
    }
    lexemes += `${token.token} `
    if (isLastLexemeInLine) lexemes += '\n'
    return lexemes//{ tokens, errors, lexemes, tokenCounter, errorTokenCounter }
}

export {
    register
}
