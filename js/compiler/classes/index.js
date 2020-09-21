class Token {
    token = ''
    lexema = ''
    constructor(token, lexema){
        this.token = token
        this.lexema = lexema
    }
}

class TokenError extends Token {
    line = 0
    description = ''
    constructor(token, lexema, line, expectedTokens) {
        super(token, lexema)
        this.line = line
        this.description = `Se esperaba alguno de los siguientes tokens: 
        ${expectedTokens.join(', ')}`
    }
}

export {
    Token,
    TokenError
}