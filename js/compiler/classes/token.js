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
    constructor(token, lexeme, dataType, line, description) {
        super(token, lexeme, dataType)
        this.line = line
        this.description = description
    }
    set description(description) {
        this.description = description
    }
    set token(token) {
        this.token = token
    }
}

export {
    Token,
    TokenError
}