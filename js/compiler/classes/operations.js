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

export default function getOperationTokens(text, counters, countErrors, line, tokenList, errors) {
    // Separa por lexemas
    let lexemas = text.split(/(\s|\+|\-|\/|=|\*|%)/), previous = null//, tokenList = []
    let file = ''
    lexemas = lexemas.filter(lexema => lexema && lexema !== ' ')
    for(let lexema in lexemas) {
        let lex = lexemas[lexema]
        switch(previous) {
            case null: 
                const r = makeTokenObject(lex, counters, countErrors, line, 'ID', tokenList) // TDF para tipos de funciones y TDV para variables
                counters = r.counts, 
                countErrors = r.countErrs
                previous = 'ID'
                if(r.token.description) errors.push(r.token)
                //tokenList.push(r.token)
                file += ` ${r.token.token}`
                break
            case 'ID':
                const re = makeTokenObject(lex, counters, countErrors, line, 'AS', tokenList)
                counters = re.counts
                countErrors = re.countErrs
                previous = 'AS'
                if(re.token.description) errors.push(re.token)
                //tokenList.push(re.token)
                file += ` ${re.token.token}`
                break
            case 'AS':
                let typeToken
                if (/^[0-9]/.exec(lex)) {
                    if (lex.indexOf('.') !== -1) typeToken = 'CNPF'
                    else typeToken = 'CNE' 
                }
                else typeToken = 'ID'
                const resu = makeTokenObject(lex, counters, countErrors, line, typeToken, tokenList)
                counters = resu.counts
                countErrors = resu.countErrs
                previous = 'OPERANDO'
                if(resu.token.description) errors.push(resu.token)
                //tokenList.push(resu.token)
                file += ` ${resu.token.token}`
                break
            case 'OPERANDO':
                const resul = makeTokenObject(lex, counters, countErrors, line, 'OA', tokenList)
                counters = resul.counts
                countErrors = resul.countErrs
                if(resul.token.description) errors.push(resul.token)
                else previous = 'OA'
                //tokenList.push(resul.token)
                file += ` ${resul.token.token}`
                break
            case 'OA':
                let typeTk
                if (/^[0-9]/.exec(lex.charAt(0))) {
                    if (lex.indexOf('.') !== -1) typeTk = 'CNPF'
                    else typeTk = 'CNE' 
                }
                else typeTk = 'ID'
                const result = makeTokenObject(lex, counters, countErrors, line, typeTk, tokenList)
                counters = result.counts
                countErrors = result.countErrs
                if(result.token.description) errors.push(result.token)
                //tokenList.push(result.token)
                file += ` ${result.token.token}`
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
        tokenListO: tokenList,
        fileO: file.trim(),
        countO: counters,
        countErrO: countErrors,
        errsO: errors
    }
}

