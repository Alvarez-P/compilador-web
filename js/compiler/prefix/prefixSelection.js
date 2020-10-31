
/**
 * @description Return a function that decides which tokens are selected for prefix parsing, 
 * given certain context conditions
 * @param {Array} tokensLine Array of tokens candidate to prefix parsing
 * @param {Strin} isCompilingPossible Decides whether to perform selection
 * @param {String} lineType Line type being analyzed currently by the compiler
 * @param {String} closingBlock Indicates which code structure (if any) just closed
 * @returns {Array} Array of tokens selected for prefix parsing, or null, if
 * no tokens are selected.
 */
function setupTokenSelection(context){
    return (tokensLine) => {
        if (context.isCompilingPossible){
            if (context.lineType==='operation') return tokensLine //tokensLines.push(tokensLine)
            else if (context.lineType==='while'){
                //Del while solo se toma la condicion
                tokensLine.tokens.splice(tokensLine.tokens.length-1, 1)
                tokensLine.tokens.splice(0, 2)
                return tokensLine //tokensLines.push(tokensLine)
            } else if (context.closingBlock==='while'){ 
                return {tokens: [], lineType: 'whileEnd'}
            }
        }
        return null
    }
}

/**
 * Decide si un token debería almacenarse para su conversión a prefijo.
 * @param {String} lineType Tipo de línea que se está analizando.
 * @returns {Boolean} Si el token debería almacenarse.
 */
function shouldTakeToken(lineType){
    if (['while', 'operation'].includes(lineType)) return true
    else return false
}


export {
    shouldTakeToken,
    setupTokenSelection
}