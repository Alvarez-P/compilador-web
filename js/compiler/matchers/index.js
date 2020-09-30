import { Token, TokenError } from "../classes/token.js"
import { linesRegex, matchingTokens } from "../var/regex.js"
/**
 * @function matcher
 * @description match lexeme with tokens regexes 
 * @param {String} lexem 
 * @param {Object} matchingTokens
 * @param {Array} expectedTokens
 * @return {String} Token type
 */
export const matcher = (lexeme, regexObj) => {
    let match = null
    Object.entries(regexObj).forEach(([key, value]) => { 
        if (value.exec(lexeme)) match = key 
    })
    return match
}

/**
 * @function matcherLexeme
 * @description check if the token is correct
 * @param {String} lexeme
 * @param {Object} regexList
 * @param {Ocject} Context
 * @return {Object} Token Instance or TokenError Instance
 */
export const matcherLexeme = (lexeme, Context) => {
    let requiredRegex = {}
    Context.expectedTokens.forEach(tokenType => {
        requiredRegex[tokenType] = matchingTokens[tokenType]
    })
    const match = matcher(lexeme, requiredRegex)
    return match ?
        new Token(match, lexeme, '') : 
        new TokenError(
            Context.expectedTokens[0], 
            lexeme, 
            '', 
            Context.lineNumber + 1, 
            `Se esperaba alguno de los siguientes tokens: ${Context.expectedTokens.join(', ')}`
        )
}

/**
 * @function matcherLine
 * @description check if the token is correct
 * @param {String} lexeme
 * @return {Object} Line Type
*/
export const matcherLine = (lexeme) => {
    return matcher(lexeme, linesRegex)
}