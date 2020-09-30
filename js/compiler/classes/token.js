class BaseToken {
    token = null
    lexeme = null
    constructor(token, lexeme){
        this.token = token
        this.lexeme = lexeme
    }
}

class Token extends BaseToken{
    dataType = null
    constructor(token, lexeme, dataType){
        super(token, lexeme)
        this.dataType = dataType
    }
}

class TokenError extends BaseToken {
    errorType = null
    line = 0
    description = ''
    constructor(token, lexeme, errorType, line, description) {
        super(token, lexeme)
        this.errorType = errorType
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