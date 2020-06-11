import makeTokenObject from "./makeTokenObject.js"

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

export default function getFunctionTokens(text, counters, countErrors, line) {
    //
    let lexemas = text.split(/(\s|,|\(|\)|{)/), previous = null, tokenList = []
    let file = ''
    lexemas = lexemas.filter(lexema => lexema && lexema !== ' ')
    for(const lexema in lexemas) {
        let lex = lexemas[lexema]
        switch(previous) {
            case null: 
                const r = makeTokenObject(lex, counters, countErrors, line, 'TDF') // TDF para tipos de funciones y TDV para variables
                counters, countErrors, previous = 'TD', r.countErrs, r.counts, 
                tokenList.push(r.token)
                file += ` ${r.token.token}`
                break
            case 'TD':
                const re = makeTokenObject(lex, counters, countErrors, line, 'ID')
                counters, countErrors, previous = 'IDF', re.countErrs, re.counts
                tokenList.push(re.token)
                file += ` ${re.token.token}`
                break
            case 'IDF':
                const res = makeTokenObject(lex, counters, countErrors, line, 'DEL')
                counters, countErrors, previous =  '(', res.countErrs, res.counts
                tokenList.push(res.token)
                file += ` ${res.token.token}`
                break
            case '(':
                let typeToken = lex.indexOf(')') !== -1 ? 'DEL' : 'TDV'
                const resu = makeTokenObject(lex, counters, countErrors, line, typeToken)
                counters, countErrors = resu.counts, resu.countErrs
                previous = typeToken === 'DEL' ? ')' : 'TDV'
                tokenList.push(resu.token)
                file += ` ${resu.token.token}`
                break
            case 'TDV':
                const resul = makeTokenObject(lex, counters, countErrors, line, 'ID')
                counters, countErrors, previous = 'ID', resul.countErrs, resul.counts
                tokenList.push(resul.token)
                file += ` ${resul.token.token}`
                break
            case 'ID':
                const typeTk = lex.indexOf(')') !== -1 ? 'DEL' : 'SEP'
                const result = makeTokenObject(lex, counters, countErrors, line, typeTk)
                counters, countErrors = result.countErrs, result.counts
                previous = typeTk === 'DEL' ? ')' : 'SEP'
                tokenList.push(result.token)
                file += ` ${result.token.token}`
                break
            case 'SEP':
                const resulta = makeTokenObject(lex, counters, countErrors, line, 'TDV')
                counters, countErrors, previous = 'TD', resulta.countErrs,  resulta.counts
                tokenList.push(resulta.token)
                file += ` ${resulta.token.token}`
                break
            case ')':
                const resultad = makeTokenObject(lex, counters, countErrors, line, 'DEL')
                counters, countErrors, previous = '{', resultad.countErrs,  resultad.counts
                tokenList.push(resultad.token)
                file += ` ${resultad.token.token}`
                break
            default:
                const token = {
                    token: `ERLX`,
                    line,
                    lexema: lex,
                    description: 'No se reconoce el lexema'
                }
                tokenList.push(token)
                file += ` ${token.token}`
                break
        }
    }
    return {
        tokenListF: tokenList,
        fileF: file.trim(),
        countF: counters,
        countErrF: countErrors
    }
}

