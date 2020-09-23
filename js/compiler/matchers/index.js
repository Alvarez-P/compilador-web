import { Token, TokenError } from "../classes/token"
import { linesRegex, matchingTokens } from "../var/regex"
/**
 * @function matcher
 * @description match lexeme with tokens regexes 
 * @param {String} lexem 
 * @param {Object} matchingTokens
 * @param {Array} expectedTokens
 * @return {String} Token type
 */
export const matcher = (lexeme, regexList) => {
    let match = null
    regexList.forEach(([key, value]) => { 
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
        Object.assign(requiredRegex, matchingTokens[tokenType])
    })
    const match = matcher(lexeme, requiredRegex)
    return match ?
        new Token(match, lexeme, '') : 
        new TokenError(
            Context.expectedTokens[0], 
            lexeme, 
            '', 
            Context.numberLine, 
            `Se esperaba alguno de los siguientes tokens: ${context.expectedTokens.join(', ')}`
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