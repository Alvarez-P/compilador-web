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
    constructor(token, lexema, line, desc) {
        super(token, lexema)
        this.line = line
        this.description = desc === '' ? 'No se esperaba simbolo' : desc
    }
}

export {
    Token,
    TokenError
}