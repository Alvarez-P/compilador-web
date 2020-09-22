class Token {
    token = ''
    lexeme = ''
    dataType = ''
    constructor(token, lexeme, dataType){
        this.token = token
        this.lexeme = lexeme
        this.dataType = dataType
    }
}

class TokenError extends Token {
    line = 0
    description = ''
    constructor(token, lexeme, dataType, line, expectedTokens) {
        super(token, lexeme, dataType)
        this.line = line
        this.description = `Se esperaba alguno de los siguientes tokens: 
        ${expectedTokens.join(', ')}`
    }
}

export {
    Token,
    TokenError
}