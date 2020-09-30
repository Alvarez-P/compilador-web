class Token {
    token = ''
    lexeme = ''
    dataType = ''
    constructor(token, lexeme, dataType){
        this.token = token
        this.lexeme = lexeme
        this.dataType = dataType
    }
    set lexeme(lexeme){
        this.lexeme = lexeme
    }
    set dataType(dataType){
        this.dataType = dataType
    }
}

class TokenError extends Token {
    line = 1
    description = ''
    constructor(token, lexeme, dataType, lineNumber, description) {
        super(token, lexeme, dataType)
        this.lineNumber = lineNumber
        this.description = description
    }
    set lineNumber(lineNumber){
        this.lineNumber = lineNumber + 1
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