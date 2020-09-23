export const registry = ({tokens, errors, lexemes, tokenCounter, errorTokenCounter}) => (token, isLastLexemeInLine) => {
    let isRegistered = false
    tokens.forEach(current => {
        if(current.lexema === token.lexema && current.token === token.token) isRegistered = true
    })
    if (token.description) {
        token.token = token.token + errorTokenCounter[token.token]
        errors.push(token)
        errorTokenCounter[token.token] ++
    } else if (!isRegistered) {
        token.token = token.token + tokenCounter[token.token].toString()
        tokens.push(token)
        tokenCounter[token.token] ++
    }
    lexemes += `${token.token} `
    if (isLastLexemeInLine) lexemes += '\n'
    return { tokens, errors, lexemes, tokenCounter, errorTokenCounter }
}
