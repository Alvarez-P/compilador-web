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

const lexemIsRegistered = (lexem, tokens) => {
    let match = null
    for (const token of tokens){
        if (token.lexema === lexem){
            match = token
            break
        }
    }
    return match
}

const makeTokenObject = (lex, counts, countErrs, line, typeToken, tokens) => {
    let type = typeToken
    if (typeToken === 'DELE' || typeToken === 'DELO') type = 'DEL'
    if(typeToken === 'TDF' || typeToken === 'TDV') type = 'TD' 
    //DELETEconst token = tokensMatch[typeToken].exec(lex) ? new Token(`${type+(counts[type]++)}`, lex) : new TokenError(`ERLX${type + (countErrs[type]++)}`, lex, ++line, errorTokens[typeToken].description)
    
    let token = null
    if (tokensMatch[typeToken].exec(lex)){
        //Revisa si existe un token con ese lexema
        const res = lexemIsRegistered(lex, tokens)
        if (res) {
            token = new Token(res.token, lex)
        } else {
            token = new Token(`${type+(counts[type]++)}`, lex)
            tokens.push(token)
        }
        //token = new Token(`${type+(counts[type]++)}`, lex)
    } else {
        token = new TokenError(`ERLX${type + (countErrs[type]++)}`, lex, ++line, errorTokens[typeToken].description)
        tokens.push(token)
    }
    return { token, counts, countErrs }
}

export default makeTokenObject