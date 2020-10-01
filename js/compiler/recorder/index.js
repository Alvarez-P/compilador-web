const register = (tokens, errors, lexemes, tokenCounter, errorTokenCounter) => (token, isLastLexemeInLine) => {
    let isRegistered = false
    //Compara lexemas y tokens para comprobar si está registrado
    tokens.forEach(current => {
        if(current.lexema === token.lexema && current.token === token.token) isRegistered = true
    })
    //Traducción de tipos específicos a tipos genéricos
    let realToken = token.token
    if (['TDV', 'TDF'].includes(token.token)) realToken = 'TD'
    if (['DELSO', 'DELSE', 'DELBO', 'DELBE'].includes(token.token)) realToken = 'DEL'
    if (['WHILE'].includes(token.token)) realToken = 'IT'
    //console.log(token.token, realToken, tokenCounter[realToken], errorTokenCounter[realToken], isLastLexemeInLine)
    if (token.description) {
        if (token.errorType==='lexical'){
            token.token = 'ERLX' + token.token + errorTokenCounter['ERLX'+realToken]
            errorTokenCounter[realToken] ++
        } else{
            //NOTA: Find todos los semánticos
            token.token = 'ERSEM' + errorTokenCounter['SEM']
            errorTokenCounter['SEM'] ++
        }
        errors.push(token)
    } else if (!isRegistered) {
        token.token = token.token + tokenCounter[realToken]//.toString()
        tokens.push(token)
        tokenCounter[realToken] ++
    }
    lexemes += `${token.token} `
    if (isLastLexemeInLine) lexemes += '\n'
    return lexemes//{ tokens, errors, lexemes, tokenCounter, errorTokenCounter }
}

export {
    register
}
