import { tokensMatch } from "../variables/regex.js"
import { errorTokens } from '../variables/globalVariables.js'
import { Token, TokenError } from './tokenClass.js'

/** makeTokenObject
 * @description Divide cada linea en lexemas y obtiene el token segun su posicion a traves del lexema anterior
 * @param {string} lex Lexema a validar
 * @param {number} counts Objeto con los contadores de cada tipo de token
 * @param {number} countErrs Objeto con los contadores de cada tipo de token de error 
 * @param {number} line Numero de posicion en la que se encuentra esta linea en el texto
 * @param {string} typeToken Tipo de token a validar segun su posicion
 * @return {token} Objeto con el token y lexema (ademas linea y descripcion si hay error)
 * @return {counts} Objeto con los contadores de cada tipo de token de error 
 * @return {countErrs} Objeto con los contadores de cada token
*/

const makeTokenObject = (lex, counts, countErrs, line, typeToken) => {
    let type = typeToken
    if (typeToken === 'DELE' || typeToken === 'DELO') type = 'DEL'
    if(typeToken === 'TDF' || typeToken === 'TDV') type = 'TD' 
    const token = tokensMatch[typeToken].exec(lex) ? new Token(`${type+(counts[type]++)}`, lex) : new TokenError(`ERLX${type + (countErrs[type]++)}`, lex, ++line, errorTokens[typeToken].description)
    return { token, counts, countErrs }
}

export default makeTokenObject