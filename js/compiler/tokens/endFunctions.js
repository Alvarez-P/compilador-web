import makeTokenObject from "./makeTokenObject.js"
import { TokenError } from './tokenClass.js'

/** getOperationTokens
 * @description Divide cada linea en lexemas y obtiene el token segun su posicion a traves del lexema anterior
 * @param {string} text Linea a validar
 * @param {object} counters Objeto con los contadores de cada tipo de token
 * @param {object} countErrors Objeto con los contadores de cada tipo de error de token
 * @param {number} line Numero de posicion en la que se encuentra esta linea(en los tokens de error se utiliza)
 * @return {tokenList} Lista de objetos de cada lexema y sus tokens
 * @return {file} String con los tokens de la linea
 * @return {count} Objeto con los contadores de cada token
 * @return {countErr} Objeto con los contadores de cada token de error
*/

export default function getEndFuntionTokens(text, counters, countErrors, line, tokenList, errors) {
    // Separa por lexemas
    let lexemas = text.split(/(\s|})/), previous = null//, tokenList = []
    let file = ''
    lexemas = lexemas.filter(lexema => lexema && lexema !== ' ')
    for(let lexema in lexemas) {
        let lex = lexemas[lexema]
        switch(previous) {
            case null: 
                const r = makeTokenObject(lex, counters, countErrors, line, 'DELE', tokenList) // TDF para tipos de funciones y TDV para variables
                counters = r.counts, 
                countErrors = r.countErrs
                previous = 'END'
                if(r.token.description) errors.push(r.token)
                //tokenList.push(r.token)
                file += ` ${r.token.token}`
                break
            case 'END':
                const tk = new TokenError(`ERLX`, lex, ++line, '')
                errors.push(tk)
                //tokenList.push(tk)
                file += ` ${tk.token}`
                break
            default:
                const token = new TokenError(`ERLX`, lex, ++line, '')
                errors.push(token)
                //tokenList.push(token)
                file += ` ${token.token}`
                break
        }
    }
    return {
        tokenListE: tokenList,
        fileE: file.trim(),
        countE: counters,
        countErrE: countErrors,
        errsE: errors
    }
}

