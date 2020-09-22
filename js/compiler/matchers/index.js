import { Token, TokenError } from "../classes"

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
    regexList.forEach(currentRegex => { 
        if (currentRegex.exec(lexeme)) match = key 
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
export const matcherLexeme = (lexeme, regexList, Context) => {
    let requiredRegex = {}
    Context.expectedTokens.forEach(tokenType => {
        Object.assign(requiredRegex, regexList[tokenType])
    })
    const match = matcher(lexeme, requiredRegex)
    return match ? 
        new Token(match, lexeme, '') : 
        new TokenError(match, lexeme, '', Context.numberLine, Context.expectedTokens)
}

/**
 * @function matcherLine
 * @description check if the token is correct
 * @param {String} lexeme
 * @param {Object} regexList
 * @return {Object} Line Type
*/
export const matcherLine = (lexeme, regexList) => {
    return matcher(lexeme, regexList)
}