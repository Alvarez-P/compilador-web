/**
 * @function tokenMatcher
 * @description match lexeme with tokens regexes 
 * @param {String} lexem 
 * @param {Object} matchingTokens
 * @return {String} Token type
 */
const tokenMatcher = (lexeme, matchingTokens) => {
    let match = null
    Object.entries(matchingTokens).forEach(([key, value]) => {
        if(value.exec(lexeme)) match = key
    })
    return match
}

export default tokenMatcher