import makeTokenObject from "./makeTokenObject.js"
import { TokenError } from './tokenClass.js'

/** getFunctionTokens
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

export default function getFunctionTokens(text, counters, countErrors, line, tokenList, errors) {
    //
    let lexemas = text.split(/(\s|,|\(|\)|{)/), previous = null//, tokenList = []
    let file = ''
    lexemas = lexemas.filter(lexema => lexema && lexema !== ' ')
    for(const lexema in lexemas) {
        let lex = lexemas[lexema]
        switch(previous) {
            case null: 
                const r = makeTokenObject(lex, counters, countErrors, line, 'TDF', tokenList) // TDF para tipos de funciones y TDV para variables
                counters = r.counts, 
                countErrors = r.countErrs
                previous = 'TD'
                if(r.token.description) errors.push(r.token)
                //tokenList.push(r.token)
                file += ` ${r.token.token}`
                break
            case 'TD':
                const re = makeTokenObject(lex, counters, countErrors, line, 'ID', tokenList)
                counters = re.counts
                countErrors = re.countErrs
                previous = 'IDF'
                if(re.token.description) errors.push(re.token)
                //tokenList.push(re.token)
                file += ` ${re.token.token}`
                break
            case 'IDF':
                const res = makeTokenObject(lex, counters, countErrors, line, 'DEL', tokenList)
                counters = res.counts
                previous =  '('
                countErrors = res.countErrs
                if(res.token.description) errors.push(res.token)
                //tokenList.push(res.token)
                file += ` ${res.token.token}`
                break
            case '(':
                let typeToken = lex.indexOf(')') !== -1 ? 'DEL' : 'TDV'
                const resu = makeTokenObject(lex, counters, countErrors, line, typeToken, tokenList)
                counters = resu.counts
                countErrors = resu.countErrs
                previous = typeToken === 'DEL' ? ')' : 'TDV'
                if(resu.token.description) errors.push(resu.token)
                //tokenList.push(resu.token)
                file += ` ${resu.token.token}`
                break
            case 'TDV':
                //const typeTkn = lex.indexOf(')') !== -1 ? 'DEL' : 'TDV'
                const typeTkn = 'ID'
                const resul = makeTokenObject(lex, counters, countErrors, line, typeTkn, tokenList)
                counters = resul.counts
                countErrors = resul.countErrs
                //previous = typeTkn === 'DEL' ? ')' : 'TDV'
                previous = 'ID'
                if(resul.token.description) errors.push(resul.token)
                //tokenList.push(resul.token)
                file += ` ${resul.token.token}`
                break
            case 'ID':
                const typeTk = lex.indexOf(')') !== -1 ? 'DEL' : 'SEP'
                const result = makeTokenObject(lex, counters, countErrors, line, typeTk, tokenList)
                counters = result.counts
                countErrors = result.countErrs
                previous = typeTk === 'DEL' ? ')' : 'SEP'
                if(result.token.description) errors.push(result.token)
                //tokenList.push(result.token)
                file += ` ${result.token.token}`
                break
            case 'SEP':
                const resulta = makeTokenObject(lex, counters, countErrors, line, 'TDV', tokenList)
                counters = resulta.counts
                countErrors = resulta.countErrs
                previous = 'TDV'
                if(resulta.token.description) errors.push(resulta.token)
                //tokenList.push(resulta.token)
                file += ` ${resulta.token.token}`
                break
            case ')':
                const resultad = makeTokenObject(lex, counters, countErrors, line, 'DELO', tokenList)
                counters = resultad.counts
                countErrors = resultad.countErrs
                previous = resultad.token.description !== undefined ? ')' : '{'
                if(resultad.token.description) errors.push(resultad.token)
                //tokenList.push(resultad.token)
                file += ` ${resultad.token.token}`
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
        tokenListF: tokenList,
        fileF: file.trim(),
        countF: counters,
        countErrF: countErrors,
        errsF: errors
    }
}

