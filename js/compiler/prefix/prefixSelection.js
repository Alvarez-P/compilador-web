
/**
 * @description Returna una función que decide cuáles tokens son seleccionados
 * para conversión a prefijo, dadas ciertas condiciones del contexto
 * @param {Array} tokensLine Lista de tokens que podrían convertirse
 * @returns {Array} Lista de tokens seleccionados para conversión. Se devuelve null
 * si ninguno fue seleccionado
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