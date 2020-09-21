import { Token, TokenError } from "../classes"

/**
 * @function tokenMatcher
 * @description match lexeme with tokens regexes 
 * @param {String} lexem 
 * @param {Object} matchingTokens
 * @param {Array} expectedTokens
 * @return {String} Token type
 */
export const tokenMatcher = (lexeme, matchingTokens, expectedTokens) => {
    let match = null
    expectedTokens.forEach(key => { 
        if (matchingTokens[key].exec(lexeme)) match = key 
    })
    return match
}

/**
 * @function matcherFunction
 * @description check if the token is correct
 * @param {String} lexeme
 * @param {Object} matchingTokens
 * @param {Ocject} Context
 * @return {Object} Token Instance or TokenError Instance
 */
export const matcherFunction = (lexeme, matchingTokens, Context) => {
    const match = tokenMatcher(lexeme, matchingTokens, Context.expectedTokens)
    if(match) return new Token(match, lexeme)
    return new TokenError(match, lexeme, Context.numberLine, Context.expectedTokens)
}