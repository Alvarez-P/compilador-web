const register = (tokens, errors, lexemes, tokenCounter, errorTokenCounter) => (token, isLastLexemeInLine) => {
    let isRegistered = false
    //Compara lexemas y tokens para comprobar si está registrado
    tokens.forEach(current => {
        if(current.lexema === token.lexema && current.token === token.token) isRegistered = true
    })
    //Traducción de tipos específicos a tipos genéricos
    if (['TDV', 'TDF'].includes(token.token)) token.token = 'TD'
    if (['DELSO', 'DELSE', 'DELBO', 'DELBE'].includes(token.token)) token.token = 'DEL'
    if (['WHILE'].includes(token.token)) token.token = 'IT'
    //Compruba si es un token de error
    if (token.description) {
        if (token.errorType==='lexical'){
            const prevToken = token.token
            token.token = 'ERLX' + token.token + errorTokenCounter['ERLX'+token.token]
            errorTokenCounter['ERLX'+prevToken] ++
        } else{
            //NOTA: Find todos los semánticos
            token.token = 'ERSEM' + errorTokenCounter['SEM']
            errorTokenCounter['SEM'] ++
        }
        errors.push(token)
    } else if (!isRegistered) {
        const prevToken = token.token
        token.token = token.token + tokenCounter[token.token]
        tokenCounter[prevToken] ++
        tokens.push(token)
    }
    lexemes += `${token.token} `
    if (isLastLexemeInLine) lexemes += '\n'
    return lexemes//{ tokens, errors, lexemes, tokenCounter, errorTokenCounter }
}

export {
    register
}
